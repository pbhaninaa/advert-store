<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open && product"
        class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
        style="background: rgba(26, 24, 22, 0.5); backdrop-filter: blur(2px)"
        @click.self="$emit('close')"
      >
        <div
          class="w-full sm:max-w-md bg-t-surface border border-t-border rounded-t-2xl sm:rounded-theme-lg shadow-2xl max-h-[90vh] overflow-y-auto"
          @click.stop
        >
          <div class="px-5 py-4 border-b border-t-border flex items-start gap-3">
            <img
              :src="product.image"
              :alt="product.title"
              class="h-20 w-16 object-cover rounded-theme-sm shrink-0"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-display text-lg font-semibold text-t-text">{{ product.title }}</h3>
              <p class="text-t-price font-semibold mt-1">{{ formatPrice(product.price) }}</p>
            </div>
            <button
              type="button"
              class="text-t-muted hover:text-t-text p-1"
              aria-label="Close"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <form class="p-5 space-y-4" @submit.prevent="submit">
            <p class="text-xs text-t-muted leading-relaxed">
              Choose size, colour, and any details so your WhatsApp order is exact.
            </p>

            <div v-if="hasSizes">
              <label class="cart-label">Size *</label>
              <select v-model="form.size" class="cart-field" required>
                <option disabled value="">Select size</option>
                <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
              </select>
            </div>
            <div v-else>
              <label class="cart-label">Size *</label>
              <input
                v-model="form.size"
                type="text"
                class="cart-field"
                placeholder="e.g. M, 32, One size"
                required
              />
            </div>

            <div v-if="hasColors">
              <label class="cart-label">Colour *</label>
              <select v-model="form.color" class="cart-field" required>
                <option disabled value="">Select colour</option>
                <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
              </select>
            </div>
            <div v-else>
              <label class="cart-label">Colour *</label>
              <input
                v-model="form.color"
                type="text"
                class="cart-field"
                placeholder="e.g. Black, Navy, Floral"
                required
              />
            </div>

            <div>
              <label class="cart-label">Extra details (optional)</label>
              <textarea
                v-model="form.itemNote"
                rows="2"
                class="cart-field"
                placeholder="e.g. Prefer fitted, gift wrap, etc."
              />
            </div>

            <div>
              <label class="cart-label">Quantity</label>
              <div class="flex items-center gap-3">
                <button type="button" class="qty-btn" @click="form.qty = Math.max(1, form.qty - 1)">−</button>
                <span class="w-8 text-center font-medium">{{ form.qty }}</span>
                <button type="button" class="qty-btn" @click="form.qty += 1">+</button>
              </div>
            </div>

            <button type="submit" class="btn-primary w-full py-3.5">
              Add to Bag
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useCart } from '../composables/useCart'
import { formatPrice } from '../utils/checkout'
import { getProductOptions } from '../utils/productOptions'

const props = defineProps({
  open: Boolean,
  product: Object,
})

const emit = defineEmits(['close', 'added'])

const { addItem } = useCart()

const form = reactive({
  size: '',
  color: '',
  itemNote: '',
  qty: 1,
})

const sizes = computed(() => getProductOptions(props.product).sizes)
const colors = computed(() => getProductOptions(props.product).colors)
const hasSizes = computed(() => sizes.value.length > 0)
const hasColors = computed(() => colors.value.length > 0)

watch(
  () => props.product,
  () => {
    form.size = ''
    form.color = ''
    form.itemNote = ''
    form.qty = 1
  },
)

function submit() {
  addItem(props.product, {
    size: form.size,
    color: form.color,
    itemNote: form.itemNote,
    qty: form.qty,
  })
  emit('added')
  emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.qty-btn {
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--t-border);
  border-radius: var(--t-radius-sm);
  background: var(--t-surface);
  color: var(--t-text);
}
</style>
