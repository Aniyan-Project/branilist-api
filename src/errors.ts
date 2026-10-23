export class BranilistError extends Error {
  constructor(message: string, options?: ErrorOptions) { super(message, options); this.name = new.target.name }
}
export class ConfigurationError extends BranilistError {}
export class ProtocolError extends BranilistError {}
export class NetworkError extends BranilistError {}
export class TimeoutError extends BranilistError {}
export class RequestAbortedError extends BranilistError {}
export interface GraphQLErrorDetail {
  message: string
  path?: ReadonlyArray<string | number>
  locations?: ReadonlyArray<{ line: number; column: number }>
  extensions?: Readonly<Record<string, unknown>>
}
export class HTTPError extends BranilistError {
  constructor(public readonly status: number, public readonly body: string, public readonly retryAfterMs?: number) {
    super(`Branilist returned HTTP ${status}`)
  }
}
export class GraphQLRequestError<T = unknown> extends BranilistError {
  constructor(public readonly errors: ReadonlyArray<GraphQLErrorDetail>, public readonly data: T | null | undefined) {
    super(errors.map(e => e.message).join('; '))
  }
  get codes(): ReadonlyArray<string> { return this.errors.flatMap(e => typeof e.extensions?.code === 'string' ? [e.extensions.code] : []) }
}
export class OAuthError extends BranilistError {
  constructor(public readonly status: number, public readonly code: string, public readonly description?: string) {
    super(`Branilist OAuth failed: ${code}`)
  }
}
