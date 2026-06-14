/** In-memory product list (loaded from my-products/products.json). */
let catalog = []

export function setCatalog(items) {
  catalog = items
}

export function getCatalog() {
  return catalog
}

export function getProductById(id) {
  return catalog.find((item) => item.id === id)
}
