import { ConfigurationError, HTTPError, NetworkError, ProtocolError, RequestAbortedError, TimeoutError } from './errors.js'

export type ValueProvider<T> = T | (() => T | Promise<T>)
export type HeaderMap = Readonly<Record<string, string>>
export interface ResponseLike { status: number; headers: { get(name: string): string | null }; text(): Promise<string> }
export interface FetchInit {
  method: string; headers: Record<string, string>; body: string; signal: AbortSignal
  credentials: 'omit'; redirect: 'error'
}
export type FetchLike = (url: string, init: FetchInit) => Promise<ResponseLike>
export interface RateLimit { limit: number | null; remaining: number | null; reset: number | null; retryAfterMs: number | null }
export interface ResponseMetadata { status: number; attempt: number; durationMs: number; rateLimit: RateLimit; operationName?: string }
export interface RetryOptions { maxRetries?: number; baseDelayMs?: number; maxDelayMs?: number }
export interface TransportOptions {
  endpoint?: string
  accessToken?: ValueProvider<string | undefined>
  apiKey?: ValueProvider<string | undefined>
  headers?: ValueProvider<HeaderMap>
  fetch?: FetchLike
  timeoutMs?: number
  retry?: RetryOptions | false
  allowInsecureHTTP?: boolean
  onResponse?: (metadata: Readonly<ResponseMetadata>) => void
  onRetry?: (metadata: Readonly<{ attempt: number; delayMs: number; operationName?: string }>) => void
}
export interface RequestOptions {
  signal?: AbortSignal
  timeoutMs?: number
  headers?: HeaderMap
  /** Explicitly asserts the whole operation is safe to repeat. Mutations/raw requests otherwise never retry. */
  idempotent?: boolean
  retry?: RetryOptions | false
  operationName?: string
}
export interface TransportResult { value: unknown; metadata: ResponseMetadata }
export function endpointURL(value: string, allowHTTP = false): string {
  let url: URL
  try { url = new URL(value) } catch { throw new ConfigurationError('Endpoint must be an absolute HTTP(S) URL') }
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
  if ((url.protocol !== 'https:' && (url.protocol !== 'http:' || (!allowHTTP && !loopback))) || url.username || url.password || url.hash) throw new ConfigurationError('Use HTTPS, or explicitly allow HTTP for a development endpoint; URL credentials/fragments are forbidden')
  return url.toString()
}
function finite(value: number, name: string, zero = false): number {
  if (!Number.isSafeInteger(value) || value < (zero ? 0 : 1)) throw new ConfigurationError(`${name} must be a ${zero ? 'nonnegative' : 'positive'} integer`)
  return value
}
function normalize(...maps: Array<HeaderMap | undefined>): Record<string, string> {
  const result: Record<string, string> = Object.create(null) as Record<string, string>
  for (const map of maps) for (const [key, value] of Object.entries(map ?? {})) {
    if (!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/.test(key) || typeof value !== 'string' || /[\r\n]/.test(value)) throw new ConfigurationError('Invalid request header')
    result[key.toLowerCase()] = value
  }
  return result
}
async function resolve<T>(provider: ValueProvider<T> | undefined): Promise<T | undefined> { return typeof provider === 'function' ? (provider as () => T | Promise<T>)() : provider }
function integerHeader(response: ResponseLike, name: string): number | null {
  const raw = response.headers.get(name)
  if (raw === null || raw.trim() === '' || !/^\d+$/.test(raw)) return null
  const number = Number(raw)
  return Number.isSafeInteger(number) ? number : null
}
function retryAfter(response: ResponseLike): number | undefined {
  const value = response.headers.get('retry-after')
  if (!value) return undefined
  const delay = /^\d+(?:\.\d+)?$/.test(value.trim()) ? Number(value) * 1000 : Date.parse(value) - Date.now()
  return Number.isFinite(delay) ? Math.max(0, Math.ceil(delay)) : undefined
}
export async function abortable<T>(signal: AbortSignal, task: Promise<T>): Promise<T> {
  if (signal.aborted) return Promise.race([task, Promise.reject(signal.reason)])
  let listener: (() => void) | undefined
  const abort = new Promise<never>((_, reject) => { listener = () => reject(signal.reason); signal.addEventListener('abort', listener, { once: true }) })
  try { return await Promise.race([task, abort]) } finally { if (listener) signal.removeEventListener('abort', listener) }
}
function wait(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolveWait, reject) => {
    if (signal.aborted) { reject(signal.reason); return }
    const finish = () => { signal.removeEventListener('abort', abort); resolveWait() }
    const timer = setTimeout(finish, ms)
    const abort = () => { clearTimeout(timer); reject(signal.reason) }
    signal.addEventListener('abort', abort, { once: true })
  })
}
export class Transport {
  readonly endpoint: string
  private readonly fetcher: FetchLike
  private readonly timeout: number
  constructor(private readonly config: TransportOptions = {}) {
    this.endpoint = endpointURL(config.endpoint ?? 'https://branilist.com/api/graphql', config.allowInsecureHTTP)
    if (config.accessToken !== undefined && config.apiKey !== undefined) throw new ConfigurationError('Use OAuth or an API key, not both')
    this.timeout = finite(config.timeoutMs ?? 15_000, 'timeoutMs')
    const native = globalThis.fetch
    if (!config.fetch && !native) throw new ConfigurationError('Provide a fetch implementation in this environment')
    this.fetcher = config.fetch ?? native.bind(globalThis)
    this.retry(config.retry)
  }
  private retry(value: RetryOptions | false | undefined): Required<RetryOptions> {
    const result = { maxRetries: value === false ? 0 : value?.maxRetries ?? 2, baseDelayMs: value === false ? 0 : value?.baseDelayMs ?? 250, maxDelayMs: value === false ? 0 : value?.maxDelayMs ?? 5_000 }
    finite(result.maxRetries, 'maxRetries', true); finite(result.baseDelayMs, 'baseDelayMs', true); finite(result.maxDelayMs, 'maxDelayMs', true)
    if (result.maxRetries > 10) throw new ConfigurationError('At most 10 retries are allowed')
    return result
  }
  async send(body: string, safeToRetry: boolean, options: RequestOptions = {}, form = false): Promise<TransportResult> {
    const duration = finite(options.timeoutMs ?? this.timeout, 'timeoutMs')
    const retry = this.retry(options.retry ?? this.config.retry)
    const started = Date.now()
    const controller = new AbortController()
    const cancel = () => controller.abort(new RequestAbortedError('Request was cancelled', { cause: options.signal?.reason }))
    if (options.signal?.aborted) cancel()
    else options.signal?.addEventListener('abort', cancel, { once: true })
    const timer = setTimeout(() => controller.abort(new TimeoutError(`Request exceeded ${duration}ms`)), duration)
    const run = async (): Promise<TransportResult> => {
      for (let attempt = 1; ; attempt++) {
        if (controller.signal.aborted) throw controller.signal.reason
        let last: unknown
        let serverDelay: number | undefined
        try {
          const headers = normalize({ accept: 'application/json', 'content-type': form ? 'application/x-www-form-urlencoded' : 'application/json' }, await resolve(this.config.headers), options.headers)
          const token = await resolve(this.config.accessToken)
          const apiKey = await resolve(this.config.apiKey)
          if (token !== undefined && apiKey !== undefined) throw new ConfigurationError('Use OAuth or an API key, not both')
          if (token) {
            if (headers.authorization) throw new ConfigurationError('Authorization header conflicts with accessToken')
            headers.authorization = `Bearer ${token}`
          }
          if (apiKey) {
            if (headers['x-branilist-api-key']) throw new ConfigurationError('API key header conflicts with apiKey')
            headers['x-branilist-api-key'] = apiKey
          }
          if (headers.authorization && headers['x-branilist-api-key']) throw new ConfigurationError('OAuth and API key headers are mutually exclusive')
          const sanitized = normalize(headers)
          if (controller.signal.aborted) throw controller.signal.reason
          let response: ResponseLike
          let text: string
          try {
            response = await this.fetcher(this.endpoint, { method: 'POST', headers: sanitized, body, signal: controller.signal, credentials: 'omit', redirect: 'error' })
            text = await response.text()
          } catch (cause) { throw new NetworkError('Branilist network request failed', { cause }) }
          serverDelay = retryAfter(response)
          const metadata: ResponseMetadata = { status: response.status, attempt, durationMs: Date.now() - started, rateLimit: { limit: integerHeader(response, 'x-ratelimit-limit'), remaining: integerHeader(response, 'x-ratelimit-remaining'), reset: integerHeader(response, 'x-ratelimit-reset'), retryAfterMs: serverDelay ?? null }, ...(options.operationName !== undefined ? { operationName: options.operationName } : {}) }
          this.config.onResponse?.(Object.freeze({ ...metadata, rateLimit: Object.freeze(metadata.rateLimit) }))
          if (response.status < 200 || response.status >= 300) throw new HTTPError(response.status, text.slice(0, 65536), serverDelay)
          try { return { value: text === '' ? null : JSON.parse(text) as unknown, metadata } } catch { throw new ProtocolError('Branilist returned invalid JSON') }
        } catch (error) {
          if (controller.signal.aborted) throw controller.signal.reason
          last = error
          const transient = error instanceof HTTPError ? [408, 429, 500, 502, 503, 504].includes(error.status) : error instanceof NetworkError
          if ((!safeToRetry && !options.idempotent) || !transient || attempt > retry.maxRetries) throw error
        }
        const backoff = Math.min(retry.maxDelayMs, retry.baseDelayMs * 2 ** (attempt - 1))
        const delay = Math.max(serverDelay ?? 0, Math.round(backoff * (0.5 + Math.random() * 0.5)))
        if (Date.now() + delay >= started + duration) throw last
        this.config.onRetry?.(Object.freeze({ attempt, delayMs: delay, ...(options.operationName !== undefined ? { operationName: options.operationName } : {}) }))
        await wait(delay, controller.signal)
      }
    }
    try { return await abortable(controller.signal, run()) } finally { clearTimeout(timer); options.signal?.removeEventListener('abort', cancel) }
  }
}
