<template>
  <article class="product-card group">
    <div class="relative aspect-[3/4] overflow-hidden bg-t-bg-alt">
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

    <div class="p-3 sm:p-5">
      <h2 class="font-display text-base sm:text-xl font-semibold text-t-text line-clamp-2 sm:line-clamp-1">
        {{ item.title }}
      </h2>

      <p class="text-t-muted mt-1.5 text-xs sm:text-sm leading-relaxed line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem]">
        {{ item.description }}
      </p>

      <div class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-t-border space-y-2.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-3">
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
