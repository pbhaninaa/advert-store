<template>
  <article class="product-card group h-full flex flex-col">
    <div class="relative aspect-[3/4] shrink-0 overflow-hidden bg-t-bg-alt">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <span
        v-if="item.category"
        class="category-badge absolute top-3 left-3 px-2.5 py-1"
      >
        {{ item.category }}
      </span>
    </div>

    <div class="flex flex-1 flex-col p-3 sm:p-5">
      <h2
        class="font-display text-base sm:text-xl font-semibold text-t-text line-clamp-2 h-[2.5rem] sm:h-[3.5rem] leading-snug"
      >
        {{ item.title }}
      </h2>

      <p
        class="text-t-muted mt-1.5 text-xs sm:text-sm leading-snug line-clamp-2 h-[2.4rem] sm:h-[2.75rem]"
      >
        {{ item.description }}
      </p>

      <div
        class="mt-auto pt-3 sm:pt-4 border-t border-t-border space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3"
      >
        <p class="text-base sm:text-lg font-semibold text-t-price tracking-wide">
          {{ formatPrice(item.price) }}
        </p>

        <button
          type="button"
          class="btn-primary btn-add w-full sm:w-auto sm:shrink-0"
          @click="$emit('configure', item)"
        >
          Add to Bag
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { formatPrice } from '../utils/checkout'

defineProps({
  item: Object,
})

defineEmits(['configure'])
</script>
