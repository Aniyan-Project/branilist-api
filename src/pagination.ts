import { ConfigurationError, ProtocolError, RequestAbortedError } from './errors.js'
export interface Page<T> { nodes: T[]; pageInfo: { limit: number; offset: number; hasNextPage: boolean } }
export interface PaginationOptions { first?: number; offset?: number; maxPages?: number; signal?: AbortSignal }
export type PageFetcher<T> = (page: { first: number; offset: number }, context: { signal?: AbortSignal }) => Promise<Page<T>>
export async function* iteratePages<T>(fetchPage: PageFetcher<T>, options: PaginationOptions = {}): AsyncGenerator<Page<T>, void, unknown> {
  const first = options.first ?? 20
  let offset = options.offset ?? 0
  const maxPages = options.maxPages ?? Infinity
  if (!Number.isInteger(first) || first < 1 || first > 100 || !Number.isInteger(offset) || offset < 0 || offset > 10000 || (maxPages !== Infinity && (!Number.isInteger(maxPages) || maxPages < 1))) throw new ConfigurationError('Invalid pagination bounds')
  for (let index = 0; index < maxPages; index++) {
    if (options.signal?.aborted) throw new RequestAbortedError('Pagination was cancelled', { cause: options.signal.reason })
    const page = await fetchPage({ first, offset }, options.signal ? { signal: options.signal } : {})
    if (!page || !Array.isArray(page.nodes) || !page.pageInfo || page.pageInfo.offset !== offset || page.pageInfo.limit !== first || typeof page.pageInfo.hasNextPage !== 'boolean') throw new ProtocolError('Invalid pagination response')
    yield page
    if (!page.pageInfo.hasNextPage || index + 1 >= maxPages) return
    if (!page.nodes.length) throw new ProtocolError('Pagination did not make progress')
    offset += first
    if (offset > 10000) throw new ConfigurationError('Public API maximum pagination offset reached; narrow the query')
  }
}
export async function* paginate<T>(fetchPage: PageFetcher<T>, options?: PaginationOptions): AsyncGenerator<T, void, unknown> {
  for await (const page of iteratePages(fetchPage, options)) yield* page.nodes
}
