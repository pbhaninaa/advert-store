import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// Use './' so the site works on GitHub Pages without extra base-path setup.
export default defineConfig({
  base: './',
  plugins: [vue(), tailwindcss()],
})
