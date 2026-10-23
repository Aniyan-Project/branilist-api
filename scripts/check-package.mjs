// Run after npm run check. Test the actual tarball in an isolated consumer.
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const npm = process.env.npm_execpath
if (!npm) throw new Error('Run with npm run test:package')
function run(args, cwd = root, capture = false) {
  const result = spawnSync(process.execPath, args, { cwd, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit' })
  if (result.status !== 0) throw new Error(`Package check failed: ${result.stderr ?? result.status}`)
  return result.stdout
}
const result = JSON.parse(run([npm, 'pack', '--ignore-scripts', '--json'], root, true))[0]
for (const file of result.files) {
  if (/node_modules|(^|\/)\.env|\.npmrc|(^|\/)tests\/|(^|\/)src\//.test(file.path)) throw new Error(`Unexpected package file: ${file.path}`)
}
const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
if (Object.keys(manifest.dependencies ?? {}).length) throw new Error('Runtime dependency policy changed')
const folder = new URL(`../.package-check/${Date.now()}/`, import.meta.url)
await mkdir(folder, { recursive: true })
const cwd = fileURLToPath(folder)
await writeFile(new URL('package.json', folder), JSON.stringify({ private: true, type: 'module' }))
run([npm, 'install', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', path.join(root, result.filename)], cwd)
await writeFile(new URL('consumer.mjs', folder), `import {createClient,buildQuery,schemaHash} from '@aniyan-project/branilist-api'; import {strict as assert} from 'node:assert'; assert.equal(createClient().endpoint,'https://branilist.com/api/graphql'); assert.match(buildQuery({api:{name:true}}).query,/api/); assert.equal(schemaHash.length,64);`)
await writeFile(new URL('consumer.cjs', folder), `const {createClient,buildQuery}=require('@aniyan-project/branilist-api');require('node:assert/strict').match(buildQuery({api:{name:true}}).query,/api/);if(!createClient().endpoint)throw Error('no client');`)
run(['consumer.mjs'], cwd)
run(['consumer.cjs'], cwd)
const typeExample = `const result = client.query({media:{__args:{id:'123'},id:true,title:{romaji:true}}}); result.then(data=>{const id:string|undefined=data.media?.id;void id; // @ts-expect-error Unselected fields must remain unavailable.\n data.media?.slug;});`
await writeFile(new URL('consumer.mts', folder), `import {createClient} from '@aniyan-project/branilist-api';const client=createClient();${typeExample}`)
await writeFile(new URL('consumer.cts', folder), `import SDK = require('@aniyan-project/branilist-api');const client=SDK.createClient();${typeExample}`)
await writeFile(new URL('tsconfig.json', folder), JSON.stringify({ compilerOptions: { target: 'ES2022', module: 'NodeNext', moduleResolution: 'NodeNext', strict: true, noEmit: true, types: [], lib: ['ES2022', 'DOM', 'DOM.Iterable'] }, include: ['*.mts', '*.cts'] }))
run([path.join(root, 'node_modules/typescript/bin/tsc'), '-p', 'tsconfig.json'], cwd)
console.log(`Verified ${result.filename}: ESM, CommonJS, both declaration entrypoints, ${result.files.length} public files, zero runtime dependencies.`)
