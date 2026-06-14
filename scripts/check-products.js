import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const productsDir = join(root, 'my-products')
const jsonPath = join(productsDir, 'products.json')
const imagesDir = join(productsDir, 'images')

function fail(message) {
  console.error(`\n  ERROR: ${message}\n`)
  process.exit(1)
}

function warn(message) {
  console.warn(`  Warning: ${message}`)
}

if (!existsSync(jsonPath)) {
  fail('Missing my-products/products.json — copy products-example.json and rename it.')
}

if (!existsSync(imagesDir)) {
  fail('Missing my-products/images/ folder — create it and add your photos.')
}

let data
try {
  data = JSON.parse(readFileSync(jsonPath, 'utf8'))
} catch {
  fail('products.json is not valid JSON. Check for missing commas or quotes.')
}

const products = Array.isArray(data) ? data : data.products

if (!Array.isArray(products) || products.length === 0) {
  fail('products.json must be a list of products (or { "products": [ ... ] }).')
}

const imageFiles = new Set(
  readdirSync(imagesDir).filter((name) => /\.(jpe?g|png|webp|gif)$/i.test(name)),
)
const seenIds = new Set()

for (const [index, product] of products.entries()) {
  const label = `Product ${index + 1}${product.title ? ` (“${product.title}”)` : ''}`

  if (product.id == null || product.id === '') {
    fail(`${label} is missing "id" (use 1, 2, 3 …).`)
  }

  if (seenIds.has(product.id)) {
    fail(`${label} has duplicate id ${product.id}. Each id must be unique.`)
  }
  seenIds.add(product.id)

  if (!product.title?.trim()) {
    fail(`${label} is missing "title".`)
  }

  if (product.price == null || Number.isNaN(Number(product.price))) {
    fail(`${label} is missing a valid "price" (numbers only, e.g. 350).`)
  }

  if (!product.image?.trim()) {
    fail(`${label} is missing "image" (photo filename, e.g. red-dress.jpg).`)
  }

  if (!imageFiles.has(product.image)) {
    warn(`${label} — photo "${product.image}" not found in my-products/images/ yet.`)
  }
}

console.log(`\n  OK — ${products.length} product(s), ${imageFiles.size} photo(s) in my-products/\n`)
