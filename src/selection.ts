import { schema } from './generated/schema.js'
import type { Scalars, EnumTypes, QuerySelection, MutationSelection } from './generated/models.js'
import { ConfigurationError } from './errors.js'

type Fields = typeof schema.objects
type Name = keyof Fields
type Named<R extends string> = R extends `${infer T}!` ? Named<T> : R extends `[${infer T}]` ? Named<T> : R
type Ref<N extends Name, K extends keyof Fields[N]> = Fields[N][K] extends { type: infer R extends string } ? R : never
type NonNullValue<R extends string, S> = R extends `[${infer T}]` ? Array<Value<T, S>> : R extends keyof Scalars ? Scalars[R] : R extends keyof EnumTypes ? EnumTypes[R] : R extends Name ? SelectionResult<R, S> : never
type Value<R extends string, S> = R extends `${infer T}!` ? NonNullValue<T, S> : NonNullValue<R, S> | null
type AliasValue<N extends Name, S> = SelectionResult<N, S>[keyof SelectionResult<N, S>]
type Aliases<N extends Name, S> = S extends { __alias: infer A } ? { -readonly [K in keyof A]: AliasValue<N, A[K]> } : unknown
export type SelectionResult<N extends Name, S> = {
  -readonly [K in keyof S as K extends '__typename' ? S[K] extends false | undefined ? never : K : K extends keyof Fields[N] ? S[K] extends false | undefined ? never : K : never]:
    K extends '__typename' ? N : K extends keyof Fields[N] ? Value<Ref<N, K>, S[K]> : never
} & Aliases<N, S>
/** Reject unknown selected fields recursively, even when passed via a variable. */
export type SelectionGuard<N extends Name, S> = {
  [K in keyof S]: K extends '__args' | '__typename' ? S[K] : K extends '__alias' ? S[K] extends Record<string, unknown> ? { [A in keyof S[K]]: SelectionGuard<N, S[K][A]> } : never : K extends keyof Fields[N] ? Named<Ref<N, K>> extends Name ? S[K] & SelectionGuard<Named<Ref<N, K>>, S[K]> : S[K] : never
}
export type QueryResult<S extends QuerySelection> = SelectionResult<'Query', S>
export type MutationResult<S extends MutationSelection> = SelectionResult<'Mutation', S>
export interface BuiltOperation<T = unknown> {
  query: string
  variables: Record<string, unknown>
  operationType: 'query' | 'mutation'
  operationName?: string
  /** Type-only result marker; never sent to the server. */
  readonly __result?: T
}
type InputDef = { type: string; required: boolean }
type FieldDef = { type: string; args: Record<string, InputDef> }
const runtime = schema as unknown as {
  objects: Record<string, Record<string, FieldDef>>
  inputs: Record<string, Record<string, InputDef>>
  enums: Record<string, ReadonlyArray<string>>
}
const namePattern = /^[_A-Za-z][_0-9A-Za-z]*$/
function object(value: unknown): value is Record<string, unknown> { return typeof value === 'object' && value !== null && !Array.isArray(value) }
function input(ref: string, value: unknown, path: string): unknown {
  if (ref.endsWith('!')) {
    if (value === null || value === undefined) throw new ConfigurationError(`${path} cannot be null`)
    return input(ref.slice(0, -1), value, path)
  }
  if (value === null) return null
  if (ref.startsWith('[')) {
    if (!Array.isArray(value)) throw new ConfigurationError(`${path} must be an array`)
    return value.map((v, i) => input(ref.slice(1, -1), v, `${path}[${i}]`))
  }
  if (Object.hasOwn(runtime.enums, ref)) {
    if (typeof value !== 'string' || !runtime.enums[ref]!.includes(value)) throw new ConfigurationError(`${path} has an invalid enum value`)
  } else if (Object.hasOwn(runtime.inputs, ref)) {
    if (!object(value)) throw new ConfigurationError(`${path} must be an input object`)
    return argumentsValue(runtime.inputs[ref]!, value, path)
  } else if (ref === 'Int') {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < -2147483648 || value > 2147483647) throw new ConfigurationError(`${path} must be a GraphQL Int`)
  } else if (ref === 'Float') {
    if (typeof value !== 'number' || !Number.isFinite(value)) throw new ConfigurationError(`${path} must be finite`)
  } else if (ref === 'Boolean') {
    if (typeof value !== 'boolean') throw new ConfigurationError(`${path} must be boolean`)
  } else if (typeof value !== 'string') throw new ConfigurationError(`${path} must be a string (including IDs and timestamps)`)
  return value
}
function argumentsValue(defs: Record<string, InputDef>, values: Record<string, unknown>, path: string): Record<string, unknown> {
  const result: Record<string, unknown> = Object.create(null) as Record<string, unknown>
  for (const [key, value] of Object.entries(values)) {
    if (!Object.hasOwn(defs, key)) throw new ConfigurationError(`Unknown input: ${path}.${key}`)
    if (value !== undefined) result[key] = input(defs[key]!.type, value, `${path}.${key}`)
  }
  for (const [key, def] of Object.entries(defs)) if (def.required && values[key] === undefined) throw new ConfigurationError(`Missing input: ${path}.${key}`)
  return result
}
function build(root: 'Query' | 'Mutation', selection: unknown, operationName?: string): BuiltOperation {
  if (operationName !== undefined && !namePattern.test(operationName)) throw new ConfigurationError('Invalid operation name')
  const variables: Record<string, unknown> = Object.create(null) as Record<string, unknown>
  const definitions: string[] = []
  let roots = 0
  function fields(type: string, chosen: unknown, depth: number): string {
    if (depth > 12) throw new ConfigurationError('Selection exceeds public API depth limit')
    if (!object(chosen)) throw new ConfigurationError(`${type} requires a field selection`)
    const out: string[] = []
    function field(key: string, value: unknown, alias?: string): void {
      if (value === undefined || value === false) return
      if (depth === 1 && ++roots > 20) throw new ConfigurationError('At most 20 root fields are allowed')
      if (key === '__typename') {
        if (value !== true) throw new ConfigurationError('__typename must be boolean')
        out.push(`${alias ? alias + ':' : ''}__typename`); return
      }
      const defs = runtime.objects[type]!
      if (!Object.hasOwn(defs, key)) throw new ConfigurationError(`Unknown field ${type}.${key}`)
      const def = defs[key]!
      const args = object(value) ? value.__args ?? {} : {}
      if (!object(args)) throw new ConfigurationError(`${type}.${key}.__args must be an object`)
      const validated = argumentsValue(def.args, args, `${type}.${key}`)
      const argText = Object.entries(validated).map(([name, v]) => {
        const variable = `v${definitions.length}`
        variables[variable] = v
        definitions.push(`$${variable}:${def.args[name]!.type}`)
        return `${name}:$${variable}`
      })
      const named = def.type.replace(/[\[\]!]/g, '')
      let nested = ''
      if (Object.hasOwn(runtime.objects, named)) nested = `{${fields(named, value, depth + 1)}}`
      else if (value !== true && (!object(value) || !Object.keys(def.args).length || Object.keys(value).some(k => k !== '__args'))) throw new ConfigurationError(`${type}.${key} is a scalar field`)
      out.push(`${alias ? alias + ':' : ''}${key}${argText.length ? '(' + argText.join(',') + ')' : ''}${nested}`)
    }
    for (const [key, value] of Object.entries(chosen)) {
      if (key === '__args') { if (depth === 1) throw new ConfigurationError('Root __args is not supported'); continue }
      if (key === '__alias') {
        if (!object(value)) throw new ConfigurationError('__alias must be an object')
        for (const [alias, selected] of Object.entries(value)) {
          if (!namePattern.test(alias) || ['__proto__', 'constructor', 'prototype'].includes(alias) || Object.hasOwn(chosen, alias)) throw new ConfigurationError('Invalid or conflicting alias')
          if (!object(selected)) throw new ConfigurationError('An alias must select exactly one field')
          const entries = Object.entries(selected).filter(([, v]) => v !== false && v !== undefined)
          if (entries.length !== 1 || entries[0]![0].startsWith('__alias')) throw new ConfigurationError('An alias must select exactly one field')
          field(entries[0]![0], entries[0]![1], alias)
        }
      } else field(key, value)
    }
    if (!out.length) throw new ConfigurationError(`${type} selection is empty`)
    return out.join(' ')
  }
  const body = fields(root, selection, 1)
  const operationType = root === 'Query' ? 'query' : 'mutation'
  return { query: `${operationType}${operationName ? ' ' + operationName : ''}${definitions.length ? '(' + definitions.join(',') + ')' : ''}{${body}}`, variables, operationType, ...(operationName !== undefined ? { operationName } : {}) }
}
export function buildQuery<const S extends QuerySelection>(selection: S & SelectionGuard<'Query', S>, operationName?: string): BuiltOperation<QueryResult<S>> { return build('Query', selection, operationName) as BuiltOperation<QueryResult<S>> }
export function buildMutation<const S extends MutationSelection>(selection: S & SelectionGuard<'Mutation', S>, operationName?: string): BuiltOperation<MutationResult<S>> { return build('Mutation', selection, operationName) as BuiltOperation<MutationResult<S>> }
