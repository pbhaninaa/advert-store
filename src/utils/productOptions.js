import catalogItems from '../data/items.js'

export function getProductById(id) {
  return catalogItems.find((item) => item.id === id)
}

export function getProductOptions(product) {
  return {
    sizes: product?.sizes?.length ? product.sizes : [],
    colors: product?.colors?.length ? product.colors : [],
  }
}

/** Store option lists on the cart line so saved carts stay editable. */
export function snapshotProductOptions(product) {
  const { sizes, colors } = getProductOptions(product)
  return { sizesAvailable: sizes, colorsAvailable: colors }
}

export function isLineComplete(line) {
  if (!String(line.size ?? '').trim()) return false
  if (!String(line.color ?? '').trim()) return false
  return true
}

export function lineMissingFields(line) {
  const missing = []
  if (!String(line.size ?? '').trim()) missing.push('size')
  if (!String(line.color ?? '').trim()) missing.push('colour')
  return missing
}

export function enrichCartLine(line) {
  const product = getProductById(line.id)
  const options = snapshotProductOptions(product ?? line)

  return {
    ...line,
    title: line.title ?? product?.title ?? 'Item',
    category: line.category ?? product?.category ?? '',
    description: line.description ?? product?.description ?? '',
    price: line.price ?? product?.price ?? 0,
    sizesAvailable: line.sizesAvailable?.length ? line.sizesAvailable : options.sizesAvailable,
    colorsAvailable: line.colorsAvailable?.length ? line.colorsAvailable : options.colorsAvailable,
    size: line.size ?? '',
    color: line.color ?? '',
    itemNote: line.itemNote ?? '',
    qty: line.qty ?? 1,
  }
}

export function makeLineKey(id, size, color) {
  return `${id}::${String(size).trim()}::${String(color).trim()}`
}
