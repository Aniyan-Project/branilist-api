# @aniyan-project/branilist-api

SDK em TypeScript e JavaScript para a **API pública GraphQL do Branilist**. Selecione os campos de que precisa e receba respostas com tipos inferidos, sem escrever manualmente os tipos de cada operação.

- Cobertura do schema público: catálogo, perfis, biblioteca, coleções, favoritos, comunidade, notificações e fórum.
- OAuth com PKCE S256, renovação e revogação de tokens; API keys para integrações compatíveis.
- Configuração de endpoint, credenciais dinâmicas, headers, fetch, timeout, cancelamento e tentativas de leitura.
- Paginação assíncrona, aliases, consultas GraphQL livres e acesso a respostas parciais.
- Distribuições ESM e CommonJS, declarações TypeScript e nenhuma dependência de execução.

[Documentação da API](https://docs.branilist.com/guide/graphql.html) · [Termos da API](https://docs.branilist.com/guide/terms-of-use.html) · [Guia de contribuição](CONTRIBUTING.md) · [Publicação](docs/maintaining.md)

## Instalação e compatibilidade

Instale o pacote público da organização `aniyan-project`:

```sh
npm install @aniyan-project/branilist-api
```

Node.js 22 ou superior. Também pode ser usado em aplicações web com bundler e `fetch`, `AbortController` e `URL` disponíveis. Em React Native, forneça implementações compatíveis quando necessário; PKCE requer criptografia segura. O pacote não inclui polyfills nem armazenamento de credenciais. A integração com cada ambiente mobile deve ser validada pelo aplicativo.

```ts
import { createClient, MediaType } from '@aniyan-project/branilist-api'

const client = createClient({ apiKey: 'SUA_API_KEY' })
const result = await client.query({
  mediaPage: {
    __args: { search: 'Frieren', type: MediaType.ANIME, first: 10 },
    nodes: { id: true, slug: true, title: { romaji: true }, coverImage: true },
    pageInfo: { limit: true, offset: true, hasNextPage: true },
  },
})

console.log(result.mediaPage.nodes[0]?.title.romaji)
```

CommonJS: `const { createClient } = require('@aniyan-project/branilist-api')`.

API keys devem permanecer no servidor. Aplicativos públicos web/mobile devem usar OAuth para acessar dados de usuários. O SDK não altera as exigências de autenticação e escopos de cada campo.

## Seleção de campos e identificadores

Use `true` para campos escalares, objetos para seleções aninhadas e `__args` para argumentos. Valores são enviados como variáveis GraphQL, sem interpolação no documento. Campos não selecionados ficam ausentes do tipo da resposta. Campos anuláveis continuam exigindo tratamento de `null`.

IDs, incluindo MyAnimeList e AniList, são **strings**, preservando a precisão de identificadores grandes. Datas `Time` são strings ISO, sem conversão automática para `Date`.

```ts
const { media } = await client.query({
  media: {
    __args: { malId: '52991' }, // Use exatamente um: id, malId ou anilistId.
    id: true,
    title: { romaji: true, portuguese: true },
    episodes: true,
    anilistId: true,
  },
})
console.log(media?.title.romaji)

const users = await client.query({
  __alias: {
    byId: { user: { __args: { id: '123' }, username: true } },
    byName: { user: { __args: { username: '123456' }, id: true } },
  },
})
console.log(users.byName?.id)
```

Cada alias seleciona exatamente um campo. Use os argumentos explícitos de `user` para diferenciar IDs e usernames numéricos. A visibilidade dos perfis e das listas é verificada pela API.

## Biblioteca e ações autenticadas

```ts
const authenticated = createClient({
  // Resolvido a cada tentativa. Leia do armazenamento seguro do aplicativo.
  accessToken: async () => getCurrentAccessToken(),
})

const saved = await authenticated.mutation({
  saveLibraryEntry: {
    __args: { mediaId: '123', input: { status: 'CURRENT', progress: 5 } },
    mediaId: true,
    status: true,
    progress: true,
  },
})

const removed = await authenticated.mutation({
  removeLibraryEntry: {
    __args: { mediaId: '123' },
    mediaId: true,
    removed: true,
  },
})
```

`getCurrentAccessToken` representa uma função do seu aplicativo. Essas operações exigem `library:write` e atuam na biblioteca do dono do token. Mutations não são repetidas automaticamente.

O mesmo cliente oferece os demais recursos do schema:

| Área | Exemplos |
| --- | --- |
| Catálogo | `media`, `mediaPage`, `mediaBySlug`, `trendingMedia`, `genres`, `staff`, `character`, `studio` |
| Conta e perfis | `user`, `viewer.profile`, preferências, privacidade e atualização de perfil |
| Biblioteca | Listagem, pesquisa, entrada individual, insights, atualização e remoção |
| Coleções e favoritos | Coleções públicas/pessoais, criação, edição, itens e ordenação de favoritos |
| Comunidade | Feed, posts, reviews, comentários, curtidas, reações e compartilhamentos |
| Relações e notificações | Seguir, bloquear, silenciar, notificações e preferências |
| Fórum | Categorias, tags, tópicos, respostas, espaços, inscrições, reações e participação |
| Denúncias | Envio de denúncias permitidas ao usuário autenticado |

A versão inicial acompanha **24 queries e 41 mutations**, além dos campos aninhados. Não inclui operações administrativas. Consulte os [escopos e regras da API](https://docs.branilist.com/guide/graphql.html) antes de solicitar consentimento.

## Configuração

```ts
const configured = createClient({
  endpoint: 'https://branilist.com/api/graphql',
  accessToken: () => getCurrentAccessToken(),
  timeoutMs: 15_000,
  retry: { maxRetries: 2, baseDelayMs: 250, maxDelayMs: 5_000 },
  headers: { 'X-Client-Version': '1.0.0' },
  // fetch: suaImplementacaoFetch,
  onResponse: ({ status, rateLimit, durationMs }) => {
    console.log({ status, rateLimit, durationMs })
  },
  onRetry: ({ attempt, delayMs }) => console.log({ attempt, delayMs }),
})

const controller = new AbortController()
await configured.query({ api: { name: true, version: true } }, {
  signal: controller.signal,
  timeoutMs: 5_000,
  operationName: 'APIInfo',
  headers: { 'X-Request-ID': 'request-123' },
})
// controller.abort() cancela uma requisição pendente.
```

`accessToken`, `apiKey` e `headers` aceitam valor ou função síncrona/assíncrona. OAuth e API key são mutuamente exclusivos. Prefira essas opções a definir manualmente headers de autenticação. Não compartilhe um cliente com token mutável global entre usuários de um servidor SSR.

O endpoint padrão é o público `/api/graphql`. HTTPS é obrigatório; HTTP é aceito em loopback ou mediante `allowInsecureHTTP: true` para desenvolvimento. Cookies são omitidos e redirecionamentos são rejeitados pelo fetch padrão. Uma implementação de fetch própria precisa respeitar essas opções.

O timeout cobre obtenção de credenciais, rede, leitura do corpo e esperas entre tentativas. Leituras construídas por `query` podem repetir falhas de rede e HTTP 408/429/500/502/503/504, até duas vezes por padrão, respeitando `Retry-After` dentro do prazo total. Erros GraphQL não disparam repetição. `retry: false` desativa as tentativas adicionais.

Mutations e documentos livres não repetem por padrão. A opção `idempotent: true` permite repetição explícita: use apenas se **toda** a operação puder ser executada novamente com segurança. Os hooks são síncronos; exceções neles interrompem a operação. Não registre tokens, variáveis privadas nem respostas pessoais.

Um timeout ou cancelamento não confirma que o servidor desfez uma alteração já recebida. Confira o estado antes de repetir uma ação cujo resultado ficou desconhecido.

Os metadados expõem status HTTP, tentativa, duração e os headers de limites conhecidos. Headers ausentes aparecem como `null`, sem estimar cota disponível.

## Paginação

```ts
import { paginate } from '@aniyan-project/branilist-api'

for await (const item of paginate(async (page, context) => {
  const result = await authenticated.query({
    viewer: {
      libraryPage: {
        __args: page,
        nodes: { mediaId: true, progress: true },
        pageInfo: { limit: true, offset: true, hasNextPage: true },
      },
    },
  }, context)
  if (!result.viewer?.libraryPage) throw new Error('Biblioteca indisponível')
  return result.viewer.libraryPage
}, { first: 20, maxPages: 5 })) {
  console.log(item.mediaId)
}
```

`paginate` entrega itens; `iteratePages` entrega páginas. Ambos são preguiçosos, sem pré-carregamento, e aceitam `first`, `offset`, `maxPages` e `signal`. Encaminhe `context` ao cliente para cancelar também uma requisição em andamento. Limites: `first` entre 1 e 100, `offset` entre 0 e 10000. A paginação não concede autorização para coleta em massa; delimite a consulta ao uso do aplicativo.

## Documentos GraphQL e respostas parciais

```ts
import { GraphQLRequestError, HTTPError } from '@aniyan-project/branilist-api'

type APIData = { api: { name: string; version: string } }
const info = await client.request<APIData>(`
  query Info { api { name version } }
`)

try {
  await authenticated.query({ viewer: { id: true } })
} catch (error) {
  if (error instanceof GraphQLRequestError) console.log(error.codes)
  if (error instanceof HTTPError) console.log(error.status, error.retryAfterMs)
}

const response = await client.rawRequest<APIData>(
  'query Info { api { name version } }',
  {},
  { errorPolicy: 'all' },
)
console.log(response.data, response.errors, response.metadata)
```

`request` e `query` lançam `GraphQLRequestError` quando há erros, inclusive com HTTP 200 e dados parciais. `rawRequest` com `errorPolicy: 'all'` preserva `data` e `errors`; falhas HTTP, JSON inválido, timeout e cancelamento continuam lançando exceções. Classes exportadas: `BranilistError`, `ConfigurationError`, `HTTPError`, `GraphQLRequestError`, `ProtocolError`, `NetworkError`, `TimeoutError`, `RequestAbortedError` e `OAuthError`.

Documentos livres permitem fragments e directives. Nesse modo, o tipo genérico da resposta é responsabilidade da aplicação. O SDK não executa introspecção em tempo de execução. Para montar e inspecionar operações tipadas sem enviá-las, use `buildQuery` e `buildMutation`; o resultado pode ser passado a `request`/`rawRequest`.

## OAuth com PKCE

Cadastre um aplicativo no Branilist e utilize exatamente a URI de redirecionamento registrada.

```ts
import { BranilistOAuth, createPKCE, validateAuthorizationCallback } from '@aniyan-project/branilist-api'

const oauth = new BranilistOAuth({
  clientId: 'SEU_CLIENT_ID',
  redirectUri: 'meuapp://oauth/callback',
})
const pkce = await createPKCE()
const authorizeURL = oauth.authorizationURL(pkce, ['profile:read', 'library:read', 'library:write'])
// Guarde verifier e state por tentativa em armazenamento seguro e abra authorizeURL.
// Ao receber o callback, recupere os valores guardados para essa tentativa:
const code = validateAuthorizationCallback(callbackURL, savedState)
const tokens = await oauth.exchangeCode(code, savedVerifier)
// Persista access_token, refresh_token e sua expiração com segurança.

const rotated = await oauth.refreshToken(savedRefreshToken)
// Substitua imediatamente o refresh token antigo pelo novo.
await oauth.revokeToken(rotated.refresh_token)
```

`callbackURL`, `savedState`, `savedVerifier` e `savedRefreshToken` vêm do seu aplicativo. O SDK não abre telas nem persiste tokens. Não reutilize verifier/state. Renovação rotaciona o refresh token: serialize renovações concorrentes e persista a nova resposta. Troca, renovação e revogação nunca repetem automaticamente. Não embuta `clientSecret` em apps mobile ou navegadores; essa opção existe somente para clientes confidenciais em servidores.

`createPKCE(cryptoProvider)` aceita uma implementação segura compatível com Web Crypto para ambientes sem suporte nativo. Nunca substitua aleatoriedade criptográfica por `Math.random`.

## Desenvolvimento

```sh
npm ci
npm run check
npm run test:package
npm pack
```

Os testes verificam operações do schema, inferência TypeScript, erros, retries, cancelamento, paginação, PKCE, OAuth, fetch real local e entradas ESM/CommonJS. Não executam mutations contra produção.

O schema distribuído está em `schema.graphql`. Para acompanhar alterações na documentação pública:

```sh
npm run schema:sync
npm run generate
npm run check
```

Também é possível importar um SDL local com `npm run schema:sync -- --file caminho/schema.graphql`. A geração é determinística; o CI rejeita arquivos gerados desatualizados. Mudanças no schema precisam de revisão e nova versão do pacote; instalações existentes não mudam silenciosamente.

## Licença e uso da API

O código deste SDK está disponível sob [MIT](LICENSE). O acesso ao serviço Branilist segue os [Termos de Uso da API](https://docs.branilist.com/guide/terms-of-use.html), incluindo regras de uso comercial, privacidade, nomenclatura e coleta de dados. A licença do SDK não substitui esses termos, não fornece credenciais e não remove escopos ou limites do serviço.
