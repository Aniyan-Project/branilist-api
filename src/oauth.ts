import { ConfigurationError, HTTPError, OAuthError, ProtocolError } from './errors.js'
import { Transport, endpointURL } from './transport.js'
import type { TransportOptions, RequestOptions } from './transport.js'

export interface CryptoProvider {
  getRandomValues(array: Uint8Array): Uint8Array
  subtle: { digest(algorithm: string, data: ArrayBuffer): Promise<ArrayBuffer> }
}
export interface PKCE { verifier: string; challenge: string; challengeMethod: 'S256'; state: string }
function base64url(bytes: Uint8Array): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  let result = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i]! << 16) | ((bytes[i + 1] ?? 0) << 8) | (bytes[i + 2] ?? 0)
    result += chars[(n >>> 18) & 63]! + chars[(n >>> 12) & 63]!
    if (i + 1 < bytes.length) result += chars[(n >>> 6) & 63]!
    if (i + 2 < bytes.length) result += chars[n & 63]!
  }
  return result
}
/** Store verifier and state per authorization attempt; never reuse them. */
export async function createPKCE(crypto: CryptoProvider | undefined = globalThis.crypto): Promise<PKCE> {
  if (!crypto?.getRandomValues || !crypto.subtle) throw new ConfigurationError('PKCE requires secure Web Crypto; provide a compatible implementation')
  const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)))
  const encoded = Uint8Array.from(verifier, char => char.charCodeAt(0))
  const challenge = base64url(new Uint8Array(await crypto.subtle.digest('SHA-256', encoded.buffer)))
  const state = base64url(crypto.getRandomValues(new Uint8Array(32)))
  return { verifier, challenge, challengeMethod: 'S256', state }
}
export function validateAuthorizationCallback(url: string | URL, expectedState: string): string {
  const parsed = new URL(url)
  const state = parsed.searchParams.get('state')
  if (!expectedState || !state || state !== expectedState) throw new OAuthError(0, 'state_mismatch')
  const error = parsed.searchParams.get('error')
  if (error) throw new OAuthError(0, error, parsed.searchParams.get('error_description') ?? undefined)
  const code = parsed.searchParams.get('code')
  if (!code) throw new ProtocolError('OAuth callback does not contain an authorization code')
  return code
}
export interface TokenSet { access_token: string; token_type: string; expires_in: number; refresh_token: string; scope: string }
export interface OAuthOptions extends Omit<TransportOptions, 'endpoint' | 'accessToken' | 'apiKey' | 'retry'> {
  clientId: string
  redirectUri: string
  /** Confidential server applications only. Never embed this in web/mobile clients. */
  clientSecret?: string
  issuer?: string
  authorizeEndpoint?: string
  tokenEndpoint?: string
  revokeEndpoint?: string
}
export class BranilistOAuth {
  private readonly token: Transport
  private readonly revoke: Transport
  private readonly authorize: string
  constructor(private readonly config: OAuthOptions) {
    if (!config.clientId.trim() || !config.redirectUri.trim()) throw new ConfigurationError('OAuth requires clientId and redirectUri')
    let redirect: URL
    try { redirect = new URL(config.redirectUri) } catch { throw new ConfigurationError('Invalid OAuth redirect URI') }
    if (redirect.hash || redirect.username || redirect.password || ['javascript:', 'data:', 'file:', 'blob:'].includes(redirect.protocol)) throw new ConfigurationError('Invalid OAuth redirect URI')
    const issuer = endpointURL(config.issuer ?? 'https://branilist.com', config.allowInsecureHTTP)
    this.authorize = endpointURL(config.authorizeEndpoint ?? new URL('/oauth/authorize', issuer).toString(), config.allowInsecureHTTP)
    this.token = new Transport({ ...config, endpoint: config.tokenEndpoint ?? new URL('/oauth/token', issuer).toString(), retry: false })
    this.revoke = new Transport({ ...config, endpoint: config.revokeEndpoint ?? new URL('/oauth/revoke', issuer).toString(), retry: false })
  }
  authorizationURL(pkce: Pick<PKCE, 'challenge' | 'state'>, scopes: ReadonlyArray<string>): string {
    if (!/^[A-Za-z0-9_-]{43}$/.test(pkce.challenge) || !pkce.state) throw new ConfigurationError('Invalid PKCE challenge or state')
    const url = new URL(this.authorize)
    url.searchParams.set('response_type', 'code')
    url.searchParams.set('client_id', this.config.clientId)
    url.searchParams.set('redirect_uri', this.config.redirectUri)
    url.searchParams.set('scope', [...new Set(scopes)].join(' '))
    url.searchParams.set('state', pkce.state)
    url.searchParams.set('code_challenge', pkce.challenge)
    url.searchParams.set('code_challenge_method', 'S256')
    return url.toString()
  }
  private async form(transport: Transport, values: Record<string, string>, options?: RequestOptions): Promise<unknown> {
    const body = new URLSearchParams({ client_id: this.config.clientId, ...values, ...(this.config.clientSecret !== undefined ? { client_secret: this.config.clientSecret } : {}) })
    try { return (await transport.send(body.toString(), false, { ...options, retry: false, idempotent: false }, true)).value }
    catch (error) {
      if (error instanceof HTTPError) {
        let detail: { error?: unknown; error_description?: unknown } = {}
        try {
          const parsed: unknown = JSON.parse(error.body)
          if (parsed && typeof parsed === 'object') detail = parsed as typeof detail
        } catch { /* Non-JSON responses still retain HTTP status. */ }
        throw new OAuthError(error.status, typeof detail.error === 'string' ? detail.error : 'http_error', typeof detail.error_description === 'string' ? detail.error_description : undefined)
      }
      throw error
    }
  }
  private tokens(value: unknown): TokenSet {
    if (!value || typeof value !== 'object') throw new ProtocolError('Invalid OAuth token response')
    const v = value as Record<string, unknown>
    if (typeof v.access_token !== 'string' || !v.access_token || typeof v.refresh_token !== 'string' || !v.refresh_token || typeof v.token_type !== 'string' || v.token_type.toLowerCase() !== 'bearer' || typeof v.expires_in !== 'number' || !Number.isFinite(v.expires_in) || v.expires_in <= 0 || typeof v.scope !== 'string') throw new ProtocolError('Invalid OAuth token response')
    return value as TokenSet
  }
  async exchangeCode(code: string, verifier: string, options?: RequestOptions): Promise<TokenSet> {
    if (!code || !/^[A-Za-z0-9._~-]{43,128}$/.test(verifier)) throw new ConfigurationError('Invalid authorization code or PKCE verifier')
    return this.tokens(await this.form(this.token, { grant_type: 'authorization_code', code, code_verifier: verifier, redirect_uri: this.config.redirectUri }, options))
  }
  async refreshToken(refreshToken: string, options?: RequestOptions): Promise<TokenSet> {
    if (!refreshToken) throw new ConfigurationError('Refresh token cannot be empty')
    return this.tokens(await this.form(this.token, { grant_type: 'refresh_token', refresh_token: refreshToken }, options))
  }
  async revokeToken(token: string, options?: RequestOptions): Promise<void> {
    if (!token) throw new ConfigurationError('Token cannot be empty')
    await this.form(this.revoke, { token }, options)
  }
}
