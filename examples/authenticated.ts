import { createClient, paginate, BranilistOAuth, createPKCE, validateAuthorizationCallback } from '../src/index.js'

export function userClient(readToken: () => Promise<string | undefined>) {
  return createClient({ accessToken: readToken })
}

export async function updateProgress(accessToken: string, mediaId: string, progress: number) {
  return createClient({ accessToken }).mutation({ saveLibraryEntry: { __args: { mediaId, input: { status: 'CURRENT', progress } }, mediaId: true, progress: true } })
}

export async function* library(accessToken: string, signal?: AbortSignal) {
  const client = createClient({ accessToken })
  yield* paginate(async (page, context) => {
    const result = await client.query({ viewer: { libraryPage: { __args: page, nodes: { mediaId: true, progress: true }, pageInfo: { limit: true, offset: true, hasNextPage: true } } } }, context)
    if (!result.viewer?.libraryPage) throw new Error('Library unavailable')
    return result.viewer.libraryPage
  }, { first: 20, maxPages: 5, ...(signal ? { signal } : {}) })
}

export async function beginLogin(clientId: string, redirectUri: string) {
  const pkce = await createPKCE()
  const url = new BranilistOAuth({ clientId, redirectUri }).authorizationURL(pkce, ['profile:read', 'library:read', 'library:write'])
  return { url, pkce } // Persist pkce securely for this authorization attempt.
}

export async function finishLogin(clientId: string, redirectUri: string, callback: string, state: string, verifier: string) {
  const code = validateAuthorizationCallback(callback, state)
  return new BranilistOAuth({ clientId, redirectUri }).exchangeCode(code, verifier)
}
