import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves from /advert-store/
export default defineConfig({
  base: '/advert-store/',
  plugins: [vue(), tailwindcss()],
  build: {
    target: ['es2018', 'chrome64', 'edge79', 'firefox67', 'safari12'],
    cssTarget: 'chrome61',
  },
})
