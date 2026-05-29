import { inject, provide, ref, computed, watch } from 'vue'
import {
  snapshotProductOptions,
  makeLineKey,
  isLineComplete,
} from '../utils/productOptions'

const CART_KEY = Symbol('cart')
const STORAGE_KEY = 'nwabisile-cart'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    const parsed = JSON.parse(saved)
    return parsed.map((line) => ({
      ...line,
      lineKey: line.lineKey ?? String(line.id),
      size: line.size ?? '',
      color: line.color ?? '',
      itemNote: line.itemNote ?? '',
      sizesAvailable: line.sizesAvailable ?? [],
      colorsAvailable: line.colorsAvailable ?? [],
    }))
  } catch {
    return []
  }
}

function createCartState() {
  const lines = ref(loadFromStorage())

  watch(
    lines,
    (value) => localStorage.setItem(STORAGE_KEY, JSON.stringify(value)),
    { deep: true },
  )

  const totalItems = computed(() =>
    lines.value.reduce((sum, line) => sum + line.qty, 0),
  )

  const totalPrice = computed(() =>
    lines.value.reduce((sum, line) => sum + line.price * line.qty, 0),
  )

  const allLinesComplete = computed(() =>
    lines.value.every((line) => isLineComplete(line)),
  )

  function addItem(product, { size = '', color = '', itemNote = '', qty = 1 } = {}) {
    const options = snapshotProductOptions(product)
    const lineKey = makeLineKey(product.id, size, color)
    const existing = lines.value.find((line) => line.lineKey === lineKey)

    if (existing) {
      existing.qty += qty
      if (itemNote.trim()) existing.itemNote = itemNote.trim()
    } else {
      lines.value.push({
        lineKey,
        id: product.id,
        title: product.title,
        category: product.category ?? '',
        description: product.description ?? '',
        price: product.price,
        image: product.image,
        sizesAvailable: options.sizesAvailable,
        colorsAvailable: options.colorsAvailable,
        size: size.trim(),
        color: color.trim(),
        itemNote: itemNote.trim(),
        qty,
      })
    }
  }

  function updateLine(oldLineKey, updates) {
    const index = lines.value.findIndex((item) => item.lineKey === oldLineKey)
    if (index === -1) return

    const line = { ...lines.value[index], ...updates }

    if ('size' in updates) line.size = String(line.size).trim()
    if ('color' in updates) line.color = String(line.color).trim()
    if ('itemNote' in updates) line.itemNote = String(line.itemNote).trim()

    const newKey = makeLineKey(line.id, line.size, line.color)
    const dupIndex = lines.value.findIndex(
      (item, i) => i !== index && item.lineKey === newKey,
    )

    if (dupIndex !== -1) {
      lines.value[dupIndex].qty += line.qty
      lines.value.splice(index, 1)
    } else {
      line.lineKey = newKey
      lines.value[index] = line
    }
  }

  function removeItem(lineKey) {
    lines.value = lines.value.filter((line) => line.lineKey !== lineKey)
  }

  function updateQty(lineKey, qty) {
    const line = lines.value.find((item) => item.lineKey === lineKey)
    if (!line) return
    if (qty <= 0) {
      removeItem(lineKey)
    } else {
      line.qty = qty
    }
  }

  function clearCart() {
    lines.value = []
  }

  return {
    lines,
    totalItems,
    totalPrice,
    allLinesComplete,
    addItem,
    updateLine,
    removeItem,
    updateQty,
    clearCart,
  }
}

export function provideCart() {
  const cart = createCartState()
  provide(CART_KEY, cart)
  return cart
}

export function useCart() {
  const cart = inject(CART_KEY)
  if (!cart) {
    throw new Error('useCart() must be used inside a component that calls provideCart()')
  }
  return cart
}
