<template>
  <header
    class="sticky top-0 z-40 border-b backdrop-blur-md"
    style="background: var(--t-header); border-color: var(--t-border)"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="#" class="font-display text-2xl font-semibold text-t-text tracking-wide">
        {{ storeConfig.name }}
      </a>

      <button
        type="button"
        class="relative inline-flex items-center gap-2 rounded-theme-md border px-4 py-2 text-xs font-semibold uppercase tracking-widest text-t-text transition-colors hover:bg-t-bg-alt"
        style="border-color: var(--t-border-strong)"
        aria-label="Open cart"
        @click="$emit('open-cart')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Bag
        <span
          v-if="totalItems > 0"
          class="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center px-1 text-[10px] font-bold text-t-inverse rounded-full"
          style="background: var(--t-accent)"
        >
          {{ totalItems }}
        </span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { storeConfig } from '../config'
import { useCart } from '../composables/useCart'

defineEmits(['open-cart'])

const { totalItems } = useCart()
</script>
