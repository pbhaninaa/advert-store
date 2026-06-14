import { cpSync, mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = join(root, 'my-products')
const sourceImages = join(sourceDir, 'images')
const publicDir = join(root, 'public', 'my-products')
const publicImages = join(publicDir, 'images')

/** Tiny grey placeholder so the site builds before real photos are added. */
const PLACEHOLDER_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

function ensureProductImages() {
  const jsonPath = join(sourceDir, 'products.json')
  if (!existsSync(jsonPath)) return

  mkdirSync(sourceImages, { recursive: true })
  const data = JSON.parse(readFileSync(jsonPath, 'utf8'))
  const products = Array.isArray(data) ? data : data.products ?? []

  for (const product of products) {
    if (!product.image?.trim()) continue
    const filePath = join(sourceImages, product.image)
    if (!existsSync(filePath)) {
      writeFileSync(filePath, PLACEHOLDER_PNG)
      console.warn(`  Created placeholder photo: my-products/images/${product.image}`)
      console.warn('  Replace it with your real product photo before publishing.\n')
    }
  }
}

const check = spawnSync(process.execPath, [join(root, 'scripts', 'check-products.js')], {
  stdio: 'inherit',
  cwd: root,
})

if (check.status !== 0) {
  process.exit(check.status ?? 1)
}

ensureProductImages()

if (existsSync(publicDir)) {
  rmSync(publicDir, { recursive: true, force: true })
}

mkdirSync(publicImages, { recursive: true })
cpSync(join(sourceDir, 'products.json'), join(publicDir, 'products.json'))
cpSync(join(sourceDir, 'images'), publicImages, { recursive: true })

console.log('  Synced my-products/ → public/my-products/\n')
