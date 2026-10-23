import { ConfigurationError, GraphQLRequestError, ProtocolError } from './errors.js'
import type { GraphQLErrorDetail } from './errors.js'
import type { QuerySelection, MutationSelection } from './generated/models.js'
import { buildQuery, buildMutation } from './selection.js'
import type { BuiltOperation, SelectionGuard, QueryResult, MutationResult } from './selection.js'
import { Transport } from './transport.js'
import type { TransportOptions, RequestOptions, ResponseMetadata } from './transport.js'

export interface GraphQLResponse<T> { data: T | null | undefined; errors: ReadonlyArray<GraphQLErrorDetail>; extensions?: Readonly<Record<string, unknown>>; metadata: ResponseMetadata }
export interface RawRequestOptions extends RequestOptions { errorPolicy?: 'none' | 'all' }
export class BranilistClient {
  private readonly transport: Transport
  constructor(options: TransportOptions = {}) { this.transport = new Transport(options) }
  get endpoint(): string { return this.transport.endpoint }
  async query<const S extends QuerySelection>(selection: S & SelectionGuard<'Query', S>, options?: RequestOptions): Promise<QueryResult<S>> {
    return this.request(buildQuery<S>(selection, options?.operationName), undefined, options)
  }
  async mutation<const S extends MutationSelection>(selection: S & SelectionGuard<'Mutation', S>, options?: RequestOptions): Promise<MutationResult<S>> {
    return this.request(buildMutation<S>(selection, options?.operationName), undefined, options)
  }
  async request<T = unknown, V extends object = Record<string, unknown>>(document: string | BuiltOperation<T>, variables?: V, options: RequestOptions = {}): Promise<T> {
    const result = await this.rawRequest(document, variables, { ...options, errorPolicy: 'none' })
    if (result.data === undefined || result.data === null) throw new ProtocolError('GraphQL response has no data')
    return result.data
  }
  /** Raw strings are never retried automatically. Use errorPolicy:all to retain partial data. */
  async rawRequest<T = unknown, V extends object = Record<string, unknown>>(document: string | BuiltOperation<T>, variables?: V, options: RawRequestOptions = {}): Promise<GraphQLResponse<T>> {
    const built = typeof document === 'string' ? undefined : document
    if (built && variables !== undefined) throw new ProtocolError('Built operations already contain their variables')
    const operationName = options.operationName ?? built?.operationName
    const payload = { query: typeof document === 'string' ? document : document.query, variables: built?.variables ?? variables ?? {}, ...(operationName !== undefined ? { operationName } : {}) }
    if (!payload.query.trim()) throw new ProtocolError('GraphQL document cannot be empty')
    let body: string
    try { body = JSON.stringify(payload) } catch (cause) { throw new ConfigurationError('GraphQL variables must be JSON serializable', { cause }) }
    const result = await this.transport.send(body, built?.operationType === 'query', { ...options, ...(operationName !== undefined ? { operationName } : {}) })
    if (!result.value || typeof result.value !== 'object' || Array.isArray(result.value)) throw new ProtocolError('Invalid GraphQL response envelope')
    const envelope = result.value as Record<string, unknown>
    if (!Object.hasOwn(envelope, 'data') && !Object.hasOwn(envelope, 'errors')) throw new ProtocolError('Invalid GraphQL response envelope')
    if (envelope.data !== undefined && envelope.data !== null && (typeof envelope.data !== 'object' || Array.isArray(envelope.data))) throw new ProtocolError('GraphQL data must be an object or null')
    if (envelope.errors !== undefined && (!Array.isArray(envelope.errors) || envelope.errors.some(e => !e || typeof e !== 'object' || typeof e.message !== 'string'))) throw new ProtocolError('Invalid GraphQL errors')
    const errors = (envelope.errors ?? []) as GraphQLErrorDetail[]
    if (!Object.hasOwn(envelope, 'data') && !errors.length) throw new ProtocolError('GraphQL response has neither data nor errors')
    const data = envelope.data as T | null | undefined
    if (errors.length && options.errorPolicy !== 'all') throw new GraphQLRequestError(errors, data)
    return { data, errors, metadata: result.metadata, ...(envelope.extensions && typeof envelope.extensions === 'object' && !Array.isArray(envelope.extensions) ? { extensions: envelope.extensions as Record<string, unknown> } : {}) }
  }
}
export function createClient(options?: TransportOptions): BranilistClient { return new BranilistClient(options) }
