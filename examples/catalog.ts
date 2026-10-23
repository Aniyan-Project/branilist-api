import { createClient, MediaType, buildQuery, type BranilistClientOptions } from '../src/index.js'

export async function searchCatalog(apiKey: string) {
  const client = createClient({ apiKey })
  return client.query({ mediaPage: { __args: { search: 'Frieren', type: MediaType.ANIME, first: 10 }, nodes: { id: true, title: { romaji: true }, coverImage: true }, pageInfo: { limit: true, offset: true, hasNextPage: true } } })
}

export async function externalId(options: BranilistClientOptions, malId: string) {
  return createClient(options).request(buildQuery({ media: { __args: { malId }, id: true, title: { romaji: true } } }))
}
