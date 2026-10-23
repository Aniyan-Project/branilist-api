import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { createServer } from 'node:http'
import { createRequire } from 'node:module'
import { buildSchema, parse, validate, isNonNullType, isListType, isEnumType, isInputObjectType, getNamedType, isObjectType } from 'graphql'
import { getVariableValues } from 'graphql/execution/values.js'
import * as sdk from '../dist/esm/index.js'

const { createClient, buildQuery, buildMutation, ConfigurationError, ProtocolError, HTTPError, GraphQLRequestError, NetworkError, TimeoutError, RequestAbortedError, OAuthError, BranilistOAuth, createPKCE, validateAuthorizationCallback, paginate, iteratePages } = sdk
const json = (value, status = 200, headers = {}) => new Response(JSON.stringify(value), { status, headers })
const ok = () => json({ data: { api: { name: 'Branilist' } } })
const selection = { api: { name: true } }
const noDelay = { maxRetries: 2, baseDelayMs: 0, maxDelayMs: 0 }
const collect = async generator => { const all = []; for await (const item of generator) all.push(item); return all }

test('all 24 queries and 41 mutations generate valid GraphQL and correctly typed variables', async t => {
  const schema = buildSchema(await readFile(new URL('../schema.graphql', import.meta.url), 'utf8'))
  function sample(type) {
    if (isNonNullType(type)) return sample(type.ofType)
    if (isListType(type)) return [sample(type.ofType)]
    if (isEnumType(type)) return type.getValues()[0].name
    if (isInputObjectType(type)) return Object.fromEntries(Object.values(type.getFields()).filter(f => isNonNullType(f.type) && f.astNode?.defaultValue === undefined).map(f => [f.name, sample(f.type)]))
    return ({ Int: 1, Float: 1.5, Boolean: true, ID: '9223372036854775807', Time: '2026-10-23T12:00:00Z', String: 'example' })[type.name]
  }
  let count = 0
  for (const [root, builder] of [[schema.getQueryType(), buildQuery], [schema.getMutationType(), buildMutation]]) {
    for (const field of Object.values(root.getFields())) {
      await t.test(`${root.name}.${field.name}`, () => {
        const args = Object.fromEntries(field.args.filter(a => isNonNullType(a.type) && a.astNode?.defaultValue === undefined).map(a => [a.name, sample(a.type)]))
        const object = isObjectType(getNamedType(field.type))
        const chosen = object ? { __typename: true } : {}
        if (Object.keys(args).length) chosen.__args = args
        const built = builder({ [field.name]: object || Object.keys(args).length ? chosen : true }, `Test${field.name}`)
        const doc = parse(built.query)
        assert.deepEqual(validate(schema, doc), [])
        const variables = getVariableValues(schema, doc.definitions[0].variableDefinitions ?? [], built.variables)
        assert.equal(variables.errors, undefined)
        count++
      })
    }
  }
  assert.equal(count, 65)
})

test('builder uses variables, preserves null, omits undefined and supports aliases', () => {
  const attack = 'x") { viewer { id } } #'
  const built = buildQuery({ __alias: { external: { media: { __args: { malId: '9223372036854775807', id: undefined }, id: true, title: { romaji: true } } } }, mediaPage: { __args: { search: attack, type: null }, nodes: { id: true }, pageInfo: { limit: true } } })
  assert.ok(!built.query.includes(attack))
  assert.match(built.query, /external:media/)
  assert.deepEqual(Object.values(built.variables), ['9223372036854775807', attack, null])
})

test('runtime selections reject invalid fields, inputs, enums, bounds and aliases', () => {
  for (const value of [{}, { nope: true }, { media: true }, { media: { id: {} } }, { media: { __args: { id: 123 }, id: true } }, { mediaPage: { __args: { first: 2147483648 }, nodes: { id: true } } }, { mediaPage: { __args: { type: 'BAD' }, nodes: { id: true } } }, { mediaPage: { __args: { filter: { invented: true } }, nodes: { id: true } } }, { user: { __args: { username: null }, id: true }, __alias: { 'bad-name': { api: { name: true } } } }, { __alias: { both: { api: { name: true }, viewer: { id: true } } } }]) assert.throws(() => buildQuery(value), ConfigurationError)
  assert.throws(() => buildMutation({ setFollow: true }), /Missing input/)
  assert.throws(() => buildQuery(selection, 'bad name'), ConfigurationError)
  assert.throws(() => buildQuery({ __alias: Object.fromEntries(Array.from({ length: 21 }, (_, i) => [`a${i}`, selection])) }), /20 root/)
  let media = { id: true }
  for (let i = 0; i < 15; i++) media = { similar: media }
  assert.throws(() => buildQuery({ media }), /depth/)
})

test('dynamic credentials, request headers and rate limit metadata remain isolated', async () => {
  const calls = [], responses = []
  let token = 'first'
  const client = createClient({ accessToken: async () => token, headers: () => ({ 'X-Client': 'sdk' }), fetch: async (url, init) => { calls.push({ url, init }); return json({ data: { api: { name: 'Branilist' } } }, 200, { 'X-RateLimit-Limit': '100', 'X-RateLimit-Remaining': '0', 'X-RateLimit-Reset': '1700000000' }) }, onResponse: r => responses.push(r) })
  await client.query(selection, { headers: { 'X-Request': 'one' }, operationName: 'Info' })
  token = 'second'
  await client.query(selection)
  assert.equal(calls[0].init.headers.authorization, 'Bearer first')
  assert.equal(calls[1].init.headers.authorization, 'Bearer second')
  assert.equal(calls[0].init.headers['x-request'], 'one')
  assert.equal(calls[1].init.headers['x-request'], undefined)
  assert.equal(calls[0].init.credentials, 'omit')
  assert.equal(calls[0].init.redirect, 'error')
  assert.equal(responses[0].operationName, 'Info')
  assert.equal(responses[0].rateLimit.remaining, 0)
  assert.ok(!JSON.stringify(responses).includes('Bearer'))
  let other
  await createClient({ apiKey: 'key', fetch: async (_, init) => { other = init.headers; return ok() } }).query(selection)
  assert.equal(other['x-branilist-api-key'], 'key')
  assert.equal(other.authorization, undefined)
})

test('rejects insecure endpoints, credential conflicts and header injection', async () => {
  assert.throws(() => createClient({ endpoint: 'http://example.com/graphql' }), ConfigurationError)
  assert.throws(() => createClient({ endpoint: 'https://user:pass@example.com' }), ConfigurationError)
  assert.throws(() => createClient({ accessToken: 't', apiKey: 'k' }), ConfigurationError)
  for (const options of [{ accessToken: 't', headers: { Authorization: 'second' } }, { accessToken: 't', headers: { 'X-Branilist-API-Key': 'key' } }, { accessToken: 'bad\r\nInjected: value' }, { headers: { 'bad key': 'value' } }]) {
    await assert.rejects(createClient({ ...options, fetch: async () => assert.fail('must not send') }).query(selection), ConfigurationError)
  }
})

test('strict errors and explicit partial data policy', async () => {
  const envelope = { data: { api: null }, errors: [{ message: 'scope missing', path: ['api'], extensions: { code: 'FORBIDDEN' } }] }
  const client = createClient({ fetch: async () => json(envelope) })
  await assert.rejects(client.query(selection), error => error instanceof GraphQLRequestError && error.codes[0] === 'FORBIDDEN' && error.data.api === null)
  const partial = await client.rawRequest(buildQuery(selection), undefined, { errorPolicy: 'all' })
  assert.deepEqual(partial.data, envelope.data)
  assert.equal(partial.errors.length, 1)
  assert.equal(partial.metadata.rateLimit.limit, null)
})

test('malformed envelopes and invalid JSON fail as protocol errors', async () => {
  for (const body of [null, [], {}, { errors: [] }, { data: [] }, { data: 1 }, { errors: [{}] }, { errors: 'bad' }]) await assert.rejects(createClient({ fetch: async () => json(body) }).query(selection), ProtocolError)
  await assert.rejects(createClient({ fetch: async () => new Response('<html>') }).query(selection), ProtocolError)
  await assert.rejects(createClient().request('query { api { name } }', { number: 1n }), ConfigurationError)
})

test('only safe operations retry transient failures; GraphQL errors never retry', async () => {
  let calls = 0
  const retries = []
  const client = createClient({ retry: noDelay, onRetry: m => retries.push(m), fetch: async () => ++calls < 3 ? json({}, 503, { 'Retry-After': '0' }) : ok() })
  await client.query(selection)
  assert.equal(calls, 3)
  assert.equal(retries.length, 2)
  for (const kind of ['mutation', 'raw', 'graphql']) {
    calls = 0
    const failed = createClient({ retry: noDelay, fetch: async () => { calls++; return kind === 'graphql' ? json({ errors: [{ message: 'failed' }] }) : json({}, 503) } })
    await assert.rejects(kind === 'mutation' ? failed.mutation({ setFollow: { __args: { username: 'someone', enabled: true } } }) : kind === 'raw' ? failed.request('query { api { name } }') : failed.query(selection))
    assert.equal(calls, 1, kind)
  }
  calls = 0
  await createClient({ retry: noDelay, fetch: async () => ++calls === 1 ? json({}, 503) : ok() }).request('query { api { name } }', {}, { idempotent: true })
  assert.equal(calls, 2)
})

test('network retries, retry-after budget and hook failures', async () => {
  let calls = 0
  await createClient({ retry: noDelay, fetch: async () => { if (++calls === 1) throw new TypeError('offline'); return ok() } }).query(selection)
  assert.equal(calls, 2)
  calls = 0
  await assert.rejects(createClient({ timeoutMs: 100, fetch: async () => { calls++; return json({}, 429, { 'Retry-After': '60' }) } }).query(selection), e => e instanceof HTTPError && e.retryAfterMs === 60000)
  assert.equal(calls, 1)
  calls = 0
  await assert.rejects(createClient({ onResponse: () => { throw new TypeError('hook') }, fetch: async () => { calls++; return ok() } }).query(selection), /hook/)
  assert.equal(calls, 1)
  await assert.rejects(createClient({ retry: false, fetch: async () => { throw Error('offline') } }).query(selection), NetworkError)
})

test('total timeout covers providers, fetch and body even when implementations ignore abort', async () => {
  const never = () => new Promise(() => {})
  for (const config of [{ accessToken: never, fetch: async () => assert.fail() }, { fetch: never }, { fetch: async () => ({ status: 200, headers: new Headers(), text: never }) }]) await assert.rejects(createClient({ ...config, timeoutMs: 15 }).query(selection), TimeoutError)
  const controller = new AbortController()
  controller.abort()
  await assert.rejects(createClient({ fetch: async () => assert.fail() }).query(selection, { signal: controller.signal }), RequestAbortedError)
  const during = new AbortController()
  const pending = createClient({ fetch: never }).query(selection, { signal: during.signal })
  during.abort()
  await assert.rejects(pending, RequestAbortedError)
})

test('pagination is bounded, cancellable, lazy and detects non-progress', async () => {
  const offsets = []
  const fetcher = async ({ first, offset }) => { offsets.push(offset); return { nodes: [offset], pageInfo: { limit: first, offset, hasNextPage: offset < 4 } } }
  assert.deepEqual(await collect(paginate(fetcher, { first: 2 })), [0, 2, 4])
  assert.deepEqual(offsets, [0, 2, 4])
  assert.equal((await collect(iteratePages(fetcher, { first: 2, maxPages: 1 }))).length, 1)
  assert.equal((await collect(iteratePages(async ({ first, offset }) => ({ nodes: [1], pageInfo: { limit: first, offset, hasNextPage: true } }), { first: 100, offset: 10000, maxPages: 1 }))).length, 1)
  await assert.rejects(collect(paginate(fetcher, { first: 101 })), ConfigurationError)
  await assert.rejects(collect(paginate(async ({ first, offset }) => ({ nodes: [], pageInfo: { limit: first, offset, hasNextPage: true } }))), ProtocolError)
  await assert.rejects(collect(paginate(async ({ first, offset }) => ({ nodes: [1], pageInfo: { limit: first, offset, hasNextPage: true } }), { offset: 10000, first: 100 })), ConfigurationError)
  const cancel = new AbortController(); cancel.abort()
  await assert.rejects(collect(paginate(fetcher, { signal: cancel.signal })), RequestAbortedError)
})

test('PKCE uses SHA-256, unique secrets and state validation', async () => {
  const a = await createPKCE(), b = await createPKCE()
  assert.match(a.verifier, /^[A-Za-z0-9_-]{43}$/)
  assert.equal(a.challenge, createHash('sha256').update(a.verifier).digest('base64url'))
  assert.notEqual(a.verifier, b.verifier)
  assert.notEqual(a.state, b.state)
  assert.equal(validateAuthorizationCallback(`myapp://callback?code=abc&state=${a.state}`, a.state), 'abc')
  assert.throws(() => validateAuthorizationCallback('myapp://callback?code=x&state=bad', a.state), e => e instanceof OAuthError && e.code === 'state_mismatch')
  assert.throws(() => validateAuthorizationCallback(`myapp://callback?error=access_denied&state=${a.state}`, a.state), OAuthError)
  await assert.rejects(createPKCE({}), ConfigurationError)
})

test('OAuth code exchange, refresh rotation and empty revocation use correct forms', async () => {
  const calls = []
  const oauth = new BranilistOAuth({ clientId: 'app', redirectUri: 'myapp://callback', fetch: async (url, init) => { calls.push({ url, init }); return url.endsWith('/revoke') ? new Response(null, { status: 200 }) : json({ access_token: 'new-access', refresh_token: 'new-refresh', token_type: 'Bearer', expires_in: 3600, scope: 'profile:read' }) } })
  const pkce = await createPKCE()
  const auth = new URL(oauth.authorizationURL(pkce, ['profile:read', 'profile:read', 'library:write']))
  assert.equal(auth.searchParams.get('code_challenge_method'), 'S256')
  assert.equal(auth.searchParams.get('scope'), 'profile:read library:write')
  await oauth.exchangeCode('code', pkce.verifier)
  assert.equal(new URLSearchParams(calls[0].init.body).get('code_verifier'), pkce.verifier)
  assert.equal(calls[0].init.headers['content-type'], 'application/x-www-form-urlencoded')
  assert.equal((await oauth.refreshToken('old-refresh')).refresh_token, 'new-refresh')
  assert.equal(new URLSearchParams(calls[1].init.body).get('grant_type'), 'refresh_token')
  await oauth.revokeToken('new-refresh')
  assert.equal(calls.length, 3)
})

test('OAuth failures do not retry or leak credentials, including malformed errors', async () => {
  for (const body of [null, { error: 'invalid_grant', error_description: 'expired' }]) {
    let calls = 0
    const oauth = new BranilistOAuth({ clientId: 'app', redirectUri: 'myapp://callback', fetch: async () => { calls++; return json(body, 503) } })
    await assert.rejects(oauth.refreshToken('secret-refresh'), OAuthError)
    assert.equal(calls, 1)
  }
  assert.throws(() => new BranilistOAuth({ clientId: 'app', redirectUri: 'javascript:alert(1)' }), ConfigurationError)
  assert.throws(() => new BranilistOAuth({ clientId: 'app', redirectUri: 'bad' }), ConfigurationError)
})

test('real fetch and both ESM/CommonJS entrypoints work against a local HTTP server', async () => {
  const cjs = createRequire(import.meta.url)('../dist/cjs/index.js')
  const server = createServer(async (request, response) => {
    let body = ''
    for await (const chunk of request) body += chunk
    assert.equal(request.method, 'POST')
    assert.match(JSON.parse(body).query, /api/)
    response.setHeader('Content-Type', 'application/json')
    response.end(JSON.stringify({ data: { api: { name: 'Branilist' } } }))
  })
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const endpoint = `http://127.0.0.1:${server.address().port}/api/graphql`
    for (const library of [sdk, cjs]) assert.equal((await library.createClient({ endpoint }).query(selection)).api.name, 'Branilist')
  } finally { await new Promise(resolve => server.close(resolve)) }
})
