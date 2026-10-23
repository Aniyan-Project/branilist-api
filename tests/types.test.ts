import { createClient, buildQuery, MediaType, type QueryResult } from '../src/index.js'
const client = createClient()
async function inference() {
  const result = await client.query({ media: { __args: { id: '123' }, id: true, title: { romaji: true }, malId: true }, mediaPage: { __args: { type: MediaType.ANIME }, nodes: { id: true }, pageInfo: { hasNextPage: true } }, __alias: { info: { api: { name: true } } } })
  const id: string | undefined = result.media?.id
  const nullable: string | null | undefined = result.media?.malId
  const name: string = result.info.name
  const next: boolean = result.mediaPage.pageInfo.hasNextPage
  const nodes: Array<{ id: string }> = result.mediaPage.nodes
  // @ts-expect-error Unselected fields are unavailable.
  result.media?.slug
  // @ts-expect-error Nullable media must be checked.
  result.media.id
  // @ts-expect-error IDs remain strings, without precision loss.
  const numeric: number = result.media?.id
  void [id, nullable, name, next, nodes, numeric]
  await client.mutation({ saveLibraryEntry: { __args: { mediaId: '1', input: { progress: 5, status: 'CURRENT' } }, progress: true } })
}
void inference
// @ts-expect-error Unknown root field.
buildQuery({ unknown: true })
// @ts-expect-error Unknown nested field.
buildQuery({ media: { invented: true } })
const unknownVariable = { media: { id: true, invented: true } } as const
// @ts-expect-error Unknown fields are also rejected through variables.
buildQuery(unknownVariable)
// @ts-expect-error IDs are strings.
buildQuery({ media: { __args: { id: 123 }, id: true } })
// @ts-expect-error Invalid enum.
buildQuery({ mediaPage: { __args: { type: 'INVALID' }, nodes: { id: true } } })
// @ts-expect-error Required arguments.
buildQuery({ forumTopic: { id: true } })
// @ts-expect-error Object selection is required.
buildQuery({ media: true })
type Chosen = QueryResult<{ api: { name: true; version: false } }>
const chosen: Chosen = { api: { name: 'Branilist' } }
// @ts-expect-error False selections do not appear in the result.
chosen.api.version
