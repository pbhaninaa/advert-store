<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50"
        style="background: rgba(26, 24, 22, 0.4); backdrop-filter: blur(2px)"
        @click="$emit('update:open', false)"
      />
    </Transition>

    <Transition name="slide">
      <aside
        v-if="open"
        class="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-t-cart-bg shadow-2xl cart-drawer"
      >
        <div
          class="flex items-center justify-between px-6 py-5"
          style="background: var(--t-cart-header); color: var(--t-text-inverse)"
        >
          <h2 class="font-display text-xl font-semibold">Your Bag</h2>
          <button
            type="button"
            class="rounded-theme-sm p-2 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Close bag"
            @click="$emit('update:open', false)"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="lines.length === 0" class="flex flex-1 flex-col items-center justify-center px-6 text-center bg-t-cart-bg">
          <p class="font-display text-xl text-t-muted">Your bag is empty</p>
          <button
            type="button"
            class="mt-4 text-sm font-semibold uppercase tracking-widest text-t-accent hover:underline"
            @click="$emit('update:open', false)"
          >
            Continue shopping
          </button>
        </div>

        <ul v-else class="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-t-cart-bg">
          <li
            v-for="line in lines"
            :key="line.lineKey"
            class="border border-t-border p-3 bg-t-surface cart-item"
          >
            <div class="flex gap-3">
              <img
                :src="line.image"
                :alt="line.title"
                class="h-24 w-[4.5rem] object-cover shrink-0 cart-thumb"
              />
              <div class="flex-1 min-w-0">
                <h3 class="font-display text-base font-semibold text-t-text">{{ line.title }}</h3>
                <p class="text-t-price font-semibold mt-0.5 text-sm">{{ formatPrice(line.price) }} each</p>
                <div class="mt-2 flex items-center gap-2">
                  <button
                    type="button"
                    class="h-7 w-7 border border-t-border text-t-text text-sm hover:border-t-text transition-colors rounded-theme-sm"
                    @click="updateQty(line.lineKey, line.qty - 1)"
                  >
                    −
                  </button>
                  <span class="w-5 text-center text-sm font-medium">{{ line.qty }}</span>
                  <button
                    type="button"
                    class="h-7 w-7 border border-t-border text-t-text text-sm hover:border-t-text transition-colors rounded-theme-sm"
                    @click="updateQty(line.lineKey, line.qty + 1)"
                  >
                    +
                  </button>
                  <button
                    type="button"
                    class="ml-auto text-xs uppercase tracking-wide text-t-muted hover:text-t-accent transition-colors"
                    @click="removeItem(line.lineKey)"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <CartLineFields
              :line="line"
              @update="(fields) => updateLine(line.lineKey, fields)"
            />
          </li>
        </ul>

        <div v-if="lines.length > 0" class="border-t border-t-border px-5 py-5 bg-t-cart-bg">
          <label class="cart-label">Delivery / order note (optional)</label>
          <textarea
            v-model="customerNote"
            rows="2"
            class="cart-field w-full"
            placeholder="Delivery address, collection time, etc."
          />

          <div class="mt-4 flex items-center justify-between border-t border-t-border pt-4">
            <span class="text-xs uppercase tracking-widest text-t-muted">Total</span>
            <span class="font-display text-2xl font-semibold text-t-text">{{ formatPrice(totalPrice) }}</span>
          </div>

          <p v-if="!allLinesComplete" class="mt-3 text-xs text-t-accent leading-relaxed">
            Fill in size and colour for every item before ordering.
          </p>

          <p v-else class="mt-3 text-xs text-t-muted leading-relaxed">
            Your full item details (size, colour, notes) will be sent on WhatsApp or email.
          </p>

          <div class="mt-4 grid grid-cols-1 gap-2.5">
            <a
              v-if="allLinesComplete"
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90 rounded-theme-md"
              style="background: var(--t-whatsapp)"
            >
              Order via WhatsApp
            </a>
            <button
              v-else
              type="button"
              disabled
              class="py-3.5 text-xs font-semibold uppercase tracking-widest text-t-muted rounded-theme-md border border-t-border cursor-not-allowed"
            >
              Complete item details first
            </button>

            <a
              v-if="allLinesComplete"
              :href="emailUrl"
              class="btn-primary inline-flex items-center justify-center py-3.5"
            >
              Order via Email
            </a>
            <button
              v-else
              type="button"
              disabled
              class="btn-primary inline-flex items-center justify-center py-3.5 opacity-40 cursor-not-allowed"
            >
              Order via Email
            </button>
          </div>

          <button
            type="button"
            class="mt-3 w-full text-xs uppercase tracking-widest text-t-muted hover:text-t-accent transition-colors"
            @click="clearCart"
          >
            Clear bag
          </button>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeConfig } from '../config'
import { useCart } from '../composables/useCart'
import { formatPrice, getWhatsAppCheckoutUrl, getEmailCheckoutUrl } from '../utils/checkout'
import CartLineFields from './CartLineFields.vue'

defineProps({
  open: Boolean,
})

defineEmits(['update:open'])

const customerNote = ref('')
const { lines, totalPrice, allLinesComplete, updateQty, updateLine, removeItem, clearCart } = useCart()

const whatsappUrl = computed(() => getWhatsAppCheckoutUrl(lines.value, customerNote.value))
const emailUrl = computed(() => getEmailCheckoutUrl(lines.value, customerNote.value))
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
