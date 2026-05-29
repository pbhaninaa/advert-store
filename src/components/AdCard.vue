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

    <div class="p-4 sm:p-5">
      <h2 class="font-display text-lg sm:text-xl font-semibold text-t-text line-clamp-1">
        {{ item.title }}
      </h2>

      <p class="text-t-muted mt-1.5 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
        {{ item.description }}
      </p>

      <div class="flex items-center justify-between mt-4 pt-4 border-t border-t-border gap-3">
        <p class="text-lg font-semibold text-t-price tracking-wide">
          {{ formatPrice(item.price) }}
        </p>

        <button
          type="button"
          class="btn-primary shrink-0 px-4 py-2.5"
          :style="justAdded ? { background: 'var(--t-accent)' } : {}"
          @click="handleAdd"
        >
          {{ justAdded ? 'Added' : 'Add to Bag' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
import { formatPrice } from '../utils/checkout'

const props = defineProps({
  item: Object,
})

const emit = defineEmits(['added'])

const { addItem } = useCart()
const justAdded = ref(false)

function handleAdd() {
  addItem(props.item)
  justAdded.value = true
  emit('added')
  setTimeout(() => {
    justAdded.value = false
  }, 1500)
}
</script>
