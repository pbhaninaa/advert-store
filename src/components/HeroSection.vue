<template>
  <section class="relative bg-hero-fashion px-4 sm:px-6 lg:px-8 py-20 sm:py-28 overflow-hidden">
    <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div class="text-center lg:text-left">
        <span class="category-badge inline-block px-3 py-1 mb-6">
          New Season
        </span>

        <h1 class="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] text-t-text mb-6">
          Style that
          <span class="italic text-gradient-accent"> speaks</span>
        </h1>

        <p class="text-t-muted text-lg leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
          Curated pieces for every occasion. Add to your bag and order instantly via WhatsApp or email.
        </p>

        <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
          <button
            type="button"
            class="btn-primary px-8 py-3.5"
            @click="$emit('browse')"
          >
            Shop Collection
          </button>
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-outline inline-flex items-center justify-center px-8 py-3.5"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div class="hidden lg:grid grid-cols-2 gap-3">
        <div class="space-y-3 pt-8">
          <div class="aspect-[3/4] overflow-hidden rounded-theme-xl bg-t-accent-soft">
            <img :src="heroImages.dress" alt="Featured dress" class="w-full h-full object-cover" />
          </div>
          <div class="aspect-square rounded-theme-lg bg-t-bg-alt" />
        </div>
        <div class="space-y-3">
          <div class="aspect-square rounded-theme-lg bg-t-bg-alt" />
          <div class="aspect-[3/4] overflow-hidden rounded-theme-xl bg-t-accent-soft">
            <img :src="heroImages.blazer" alt="Featured blazer" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { storeConfig } from '../config'
import { formatWhatsAppPhone } from '../utils/checkout'
import { productImage } from '../utils/images'

defineEmits(['browse'])

const heroImages = {
  dress: productImage('floral-midi-dress.jpg'),
  blazer: productImage('oversized-blazer.jpg'),
}

const whatsappUrl = computed(() => {
  const phone = formatWhatsAppPhone(storeConfig.whatsappPhone)
  const text = encodeURIComponent(`Hi ${storeConfig.name}, I'd like to know more about your clothing.`)
  return `https://wa.me/${phone}?text=${text}`
})
</script>
