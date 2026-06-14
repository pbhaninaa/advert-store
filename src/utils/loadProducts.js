import { productImage } from './images'
import { setCatalog } from './catalog'

const PRODUCTS_URL = `${import.meta.env.BASE_URL}my-products/products.json?v=${__ASSET_VERSION__}`

function normalizeProduct(raw) {
  const image = raw.image ?? ''
  return {
    id: raw.id,
    title: raw.title ?? 'Product',
    category: raw.category ?? '',
    price: Number(raw.price) || 0,
    description: raw.description ?? '',
    sizes: Array.isArray(raw.sizes) ? raw.sizes : [],
    colors: Array.isArray(raw.colors) ? raw.colors : [],
    image:
      image.startsWith('http://') || image.startsWith('https://') || image.startsWith('/')
        ? image
        : productImage(image),
  }
}

export async function loadProducts() {
  const response = await fetch(PRODUCTS_URL)

  if (!response.ok) {
    throw new Error(`Could not load products (${response.status})`)
  }

  const data = await response.json()
  const list = Array.isArray(data) ? data : data.products

  if (!Array.isArray(list) || list.length === 0) {
    throw new Error('products.json must contain at least one product')
  }

  const items = list.map(normalizeProduct)
  setCatalog(items)
  return items
}
