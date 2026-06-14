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
            <template v-if="loading">Loading collection…</template>
            <template v-else-if="loadError">{{ loadError }}</template>
            <template v-else>
              {{ items.length }} pieces available. Tap <strong class="text-t-text font-medium">Add to Bag</strong>, then checkout on WhatsApp or email.
            </template>
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
          v-if="loading"
          class="text-center py-16 border border-t-border rounded-theme-lg bg-t-surface"
        >
          <p class="font-display text-xl text-t-text">Loading products…</p>
        </div>

        <div
          v-else-if="loadError"
          class="text-center py-16 border border-t-border rounded-theme-lg bg-t-surface px-6"
        >
          <p class="font-display text-xl text-t-text">Could not load products</p>
          <p class="text-t-muted mt-2 text-sm max-w-md mx-auto">{{ loadError }}</p>
          <p class="text-t-muted mt-4 text-xs">Check the <strong class="text-t-text">my-products</strong> folder and run PREVIEW-SHOP.bat.</p>
        </div>

        <div
          v-else-if="filteredItems.length > 0"
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
import { ref, computed, onMounted } from 'vue'
import HeroSection from './components/HeroSection.vue'
import SiteHeader from './components/SiteHeader.vue'
import AdCard from './components/AdCard.vue'
import CartDrawer from './components/CartDrawer.vue'
import AddToCartModal from './components/AddToCartModal.vue'
import WhatsAppFab from './components/WhatsAppFab.vue'
import ProductFilters from './components/ProductFilters.vue'
import { storeConfig } from './config'
import { provideCart } from './composables/useCart'
import { formatWhatsAppPhone } from './utils/checkout'
import { getCategories, filterItems } from './utils/filterProducts'
import { loadProducts } from './utils/loadProducts'

provideCart()

const items = ref([])
const loading = ref(true)
const loadError = ref('')
const cartOpen = ref(false)
const productToAdd = ref(null)
const selectedCategory = ref('all')
const selectedPriceRange = ref('all')

onMounted(async () => {
  try {
    items.value = await loadProducts()
  } catch (error) {
    loadError.value = error.message ?? 'Unknown error loading products.json'
  } finally {
    loading.value = false
  }
})

const categories = computed(() => getCategories(items.value))

const filteredItems = computed(() =>
  filterItems(items.value, {
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
