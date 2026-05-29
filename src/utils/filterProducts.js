/** Unique categories from products, sorted alphabetically. */
export function getCategories(items) {
  return [...new Set(items.map((item) => item.category).filter(Boolean))].sort()
}

/**
 * Filter products by category and price range.
 * @param {Array} items
 * @param {{ category?: string, priceRangeId?: string, priceRanges?: Array }} options
 */
export function filterItems(items, { category = 'all', priceRangeId = 'all', priceRanges = [] } = {}) {
  const range = priceRanges.find((r) => r.id === priceRangeId) ?? priceRanges[0]

  return items.filter((item) => {
    if (category !== 'all' && item.category !== category) return false

    if (range?.min != null && item.price < range.min) return false
    if (range?.max != null && item.price > range.max) return false

    return true
  })
}
