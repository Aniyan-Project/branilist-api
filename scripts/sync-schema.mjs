import { readFile, writeFile } from 'node:fs/promises'
import { buildSchema, validateSchema } from 'graphql'
const arg = process.argv.indexOf('--file')
const source = 'https://raw.githubusercontent.com/Aniyan-Project/Branilist-docs/main/graphql/schema.graphql'
let text
if (arg >= 0) {
  if (!process.argv[arg + 1]) throw new Error('Provide a path after --file')
  text = await readFile(process.argv[arg + 1], 'utf8')
} else {
  const response = await fetch(source, { signal: AbortSignal.timeout(30_000) })
  if (!response.ok) throw new Error(`Schema download failed: HTTP ${response.status}`)
  text = await response.text()
}
const schema = buildSchema(text)
const errors = validateSchema(schema)
if (errors.length || !schema.getQueryType() || !schema.getMutationType()) throw new Error('Invalid public schema')
await writeFile(new URL('../schema.graphql', import.meta.url), text.replaceAll('\r\n', '\n'))
console.log('Public schema synchronized; run npm run generate and review the diff.')
