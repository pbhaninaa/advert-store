import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'my-products')
const publicDir = join(root, 'public', 'my-products')
const publicImages = join(publicDir, 'images')

const check = spawnSync(process.execPath, [join(root, 'scripts', 'check-products.js')], {
  stdio: 'inherit',
  cwd: root,
})

if (check.status !== 0) {
  process.exit(check.status ?? 1)
}

if (existsSync(publicDir)) {
  rmSync(publicDir, { recursive: true, force: true })
}

mkdirSync(publicImages, { recursive: true })
cpSync(join(sourceDir, 'products.json'), join(publicDir, 'products.json'))
cpSync(join(sourceDir, 'images'), publicImages, { recursive: true })

console.log('  Synced my-products/ → public/my-products/\n')
