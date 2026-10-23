import { rm, mkdir, writeFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
const root = fileURLToPath(new URL('../', import.meta.url))
await rm(new URL('../dist', import.meta.url), { recursive: true, force: true })
for (const format of ['esm', 'cjs']) {
  const args = ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json', '--outDir', `dist/${format}`]
  if (format === 'cjs') args.push('--module', 'CommonJS', '--moduleResolution', 'Node', '--verbatimModuleSyntax', 'false')
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' })
  if (result.status !== 0) process.exit(result.status ?? 1)
  await mkdir(new URL(`../dist/${format}/`, import.meta.url), { recursive: true })
  await writeFile(new URL(`../dist/${format}/package.json`, import.meta.url), JSON.stringify({ type: format === 'esm' ? 'module' : 'commonjs' }) + '\n')
}
