import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves from /advert-store/
export default defineConfig({
  base: '/advert-store/',
  plugins: [vue(), tailwindcss()],
})
