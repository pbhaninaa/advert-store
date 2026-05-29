<template>
  <div class="min-h-screen bg-t-bg">
    <SiteHeader @open-cart="cartOpen = true" />
    <HeroSection @browse="scrollToProducts" />

    <section id="products" class="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-t-bg">
      <div class="max-w-7xl mx-auto">
        <div class="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-t-border pb-8">
          <div>
            <span class="category-badge inline-block px-2.5 py-1 mb-3">
              Collection
            </span>
            <h2 class="font-display text-4xl sm:text-5xl font-semibold text-t-text">
              Shop All
            </h2>
          </div>
          <p class="text-t-muted text-sm max-w-xs sm:text-right leading-relaxed">
            {{ items.length }} pieces available. Tap <strong class="text-t-text font-medium">Add to Bag</strong>, then checkout on WhatsApp or email.
          </p>
        </div>

        <ProductFilters
          v-model:category="selectedCategory"
          v-model:price-range="selectedPriceRange"
          :categories="categories"
          :price-ranges="storeConfig.priceRanges"
          :result-count="filteredItems.length"
          :total-count="items.length"
        />

        <div
          v-if="filteredItems.length > 0"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 items-stretch"
        >
          <AdCard
            v-for="item in filteredItems"
            :key="item.id"
            :item="item"
            @configure="openAddModal"
          />
        </div>

        <div
          v-else
          class="text-center py-16 border border-t-border rounded-theme-lg bg-t-surface"
        >
          <p class="font-display text-xl text-t-text">No items match your filters</p>
          <p class="text-t-muted mt-2 text-sm">Try a different category or price range.</p>
        </div>
      </div>
    </section>

    <footer
      class="border-t py-12 text-center text-sm text-t-muted"
      style="border-color: var(--t-border); background: var(--t-bg-alt)"
    >
      <p class="font-display text-2xl font-semibold text-t-text">{{ storeConfig.name }}</p>
      <p class="mt-2">{{ storeConfig.tagline }}</p>
      <div class="mt-5 flex flex-wrap items-center justify-center gap-6">
        <a
          :href="whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="font-medium text-t-text hover:text-t-accent transition-colors"
        >
          WhatsApp: {{ storeConfig.whatsappPhone }}
        </a>
        <a
          :href="`mailto:${storeConfig.email}`"
          class="font-medium text-t-text hover:text-t-accent transition-colors"
        >
          {{ storeConfig.email }}
        </a>
      </div>
    </footer>

    <CartDrawer v-model:open="cartOpen" />
    <AddToCartModal
      :open="!!productToAdd"
      :product="productToAdd"
      @close="productToAdd = null"
      @added="onItemAdded"
    />
    <WhatsAppFab />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeroSection from './components/HeroSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import AdCard from './components/AdCard.vue'
import CartDrawer from './components/CartDrawer.vue'
import AddToCartModal from './components/AddToCartModal.vue'
import WhatsAppFab from './components/WhatsAppFab.vue'
import ProductFilters from './components/ProductFilters.vue'
import items from './data/items'
import { storeConfig } from './config'
import { provideCart } from './composables/useCart'
import { formatWhatsAppPhone } from './utils/checkout'
import { getCategories, filterItems } from './utils/filterProducts'

provideCart()

const cartOpen = ref(false)
const productToAdd = ref(null)
const selectedCategory = ref('all')
const selectedPriceRange = ref('all')

const categories = getCategories(items)

const filteredItems = computed(() =>
  filterItems(items, {
    category: selectedCategory.value,
    priceRangeId: selectedPriceRange.value,
    priceRanges: storeConfig.priceRanges,
  }),
)

const whatsappLink = `https://wa.me/${formatWhatsAppPhone(storeConfig.whatsappPhone)}`

function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}

function openAddModal(item) {
  productToAdd.value = item
}

function onItemAdded() {
  productToAdd.value = null
  cartOpen.value = true
}
</script>
