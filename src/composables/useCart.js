import { inject, provide, ref, computed, watch } from 'vue'

const CART_KEY = Symbol('cart')
const STORAGE_KEY = 'nwabisile-cart'

function loadFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
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

  function addItem(product) {
    const existing = lines.value.find((line) => line.id === product.id)
    if (existing) {
      existing.qty += 1
    } else {
      lines.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      })
    }
  }

  function removeItem(productId) {
    lines.value = lines.value.filter((line) => line.id !== productId)
  }

  function updateQty(productId, qty) {
    const line = lines.value.find((item) => item.id === productId)
    if (!line) return
    if (qty <= 0) {
      removeItem(productId)
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
    addItem,
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
