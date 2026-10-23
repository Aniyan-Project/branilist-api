import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { buildSchema, isScalarType, isEnumType, isInputObjectType, isObjectType, isNonNullType, getNamedType } from 'graphql'
const sdl = await readFile(new URL('../schema.graphql', import.meta.url), 'utf8')
const schema = buildSchema(sdl)
const types = Object.values(schema.getTypeMap()).filter(t => !t.name.startsWith('__')).sort((a, b) => a.name.localeCompare(b.name, 'en'))
const scalars = { ID: 'string', String: 'string', Int: 'number', Float: 'number', Boolean: 'boolean', Time: 'string' }
function nonNull(ref) {
  if (ref.ofType) return `Array<${type(ref.ofType)}>`
  return scalars[ref.name] ?? ref.name
}
function type(ref) { return isNonNullType(ref) ? nonNull(ref.ofType) : `${nonNull(ref)} | null` }
const optional = field => !isNonNullType(field.type) || field.astNode?.defaultValue !== undefined || field.defaultValue !== undefined || field.default !== undefined
const property = field => `${field.name}${optional(field) ? '?' : ''}: ${type(field.type)}`
const metadata = { objects: {}, inputs: {}, enums: {} }
let model = '// Generated from schema.graphql. Do not edit manually.\n'
model += 'export interface Scalars { ID: string; String: string; Int: number; Float: number; Boolean: boolean; Time: string }\n'
const enums = []
for (const t of types) {
  if (isScalarType(t)) { if (!(t.name in scalars)) throw new Error(`Map scalar ${t.name} before generating`); continue }
  if (isEnumType(t)) {
    const values = t.getValues().map(v => v.name)
    metadata.enums[t.name] = values
    model += `export type ${t.name} = ${values.map(value => JSON.stringify(value)).join(' | ')}\n`
    model += `export const ${t.name} = ${JSON.stringify(Object.fromEntries(values.map(v => [v, v])))} as const\n`
    enums.push(`${t.name}: ${t.name}`)
  } else if (isInputObjectType(t)) {
    const fields = Object.values(t.getFields())
    metadata.inputs[t.name] = Object.fromEntries(fields.map(f => [f.name, { type: String(f.type), required: !optional(f) }]))
    model += `export interface ${t.name} { ${fields.map(property).join('; ')} }\n`
  } else if (isObjectType(t)) {
    const fields = Object.values(t.getFields())
    metadata.objects[t.name] = Object.fromEntries(fields.map(f => [f.name, { type: String(f.type), args: Object.fromEntries(f.args.map(a => [a.name, { type: String(a.type), required: !optional(a) }])) }]))
    model += `export interface ${t.name} { ${fields.map(f => `${f.name}: ${type(f.type)}`).join('; ')} }\n`
    const selection = ['__typename?: boolean', `__alias?: Record<string, Omit<${t.name}Selection, '__alias'>>`]
    for (const f of fields) {
      const named = getNamedType(f.type)
      const object = isObjectType(named)
      let value = object ? `${named.name}Selection` : 'boolean'
      if (f.args.length) {
        const argsName = `${t.name}${f.name[0].toUpperCase() + f.name.slice(1)}Args`
        model += `export interface ${argsName} { ${f.args.map(property).join('; ')} }\n`
        const required = f.args.some(a => !optional(a))
        value = object ? `(${value} & { __args${required ? '' : '?'}: ${argsName} })` : `{ __args${required ? '' : '?'}: ${argsName} }${required ? '' : ' | boolean'}`
      }
      selection.push(`${f.name}?: ${value}`)
    }
    model += `export interface ${t.name}Selection { ${selection.join('; ')} }\n`
  } else throw new Error(`Unsupported public schema type: ${t.name}; extend the generator first`)
}
model += `export interface EnumTypes { ${enums.join('; ')} }\n`
const meta = '// Generated from schema.graphql. Do not edit manually.\nexport const schema = ' + JSON.stringify(metadata, null, 2) + ' as const\n' + `export const schemaHash = '${createHash('sha256').update(sdl).digest('hex')}'\n`
await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true })
for (const [file, content] of [['models.ts', model], ['schema.ts', meta]]) {
  const url = new URL('../src/generated/' + file, import.meta.url)
  if (process.argv.includes('--check')) {
    if (await readFile(url, 'utf8').catch(() => '') !== content) throw new Error(`${file} is stale; run npm run generate`)
  } else await writeFile(url, content)
}
console.log(`Schema: ${Object.keys(metadata.objects.Query).length} queries, ${Object.keys(metadata.objects.Mutation).length} mutations, ${types.length} types.`)
