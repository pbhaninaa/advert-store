import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves from /Simple-Selling-Website/
export default defineConfig({
  base: '/Simple-Selling-Website/',
  plugins: [vue(), tailwindcss()],
})
