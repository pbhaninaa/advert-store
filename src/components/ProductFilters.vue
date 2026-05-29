<template>
  <div class="mb-10 space-y-6">
    <!-- Category -->
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-t-muted mb-3">Category</p>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill-active': category === 'all' }"
          @click="$emit('update:category', 'all')"
        >
          All
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill-active': category === cat }"
          @click="$emit('update:category', cat)"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Price -->
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-t-muted mb-3">Price</p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="range in priceRanges"
          :key="range.id"
          type="button"
          class="filter-pill"
          :class="{ 'filter-pill-active': priceRange === range.id }"
          @click="$emit('update:priceRange', range.id)"
        >
          {{ range.label }}
        </button>
      </div>
    </div>

    <p v-if="hasActiveFilters" class="text-sm text-t-muted">
      Showing {{ resultCount }} of {{ totalCount }} items
      <button
        type="button"
        class="ml-2 text-t-accent font-medium hover:underline"
        @click="clearFilters"
      >
        Clear filters
      </button>
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  categories: Array,
  priceRanges: Array,
  category: String,
  priceRange: String,
  resultCount: Number,
  totalCount: Number,
})

const emit = defineEmits(['update:category', 'update:priceRange', 'clear'])

const hasActiveFilters = computed(
  () => props.category !== 'all' || props.priceRange !== 'all',
)

function clearFilters() {
  emit('update:category', 'all')
  emit('update:priceRange', 'all')
  emit('clear')
}
</script>
