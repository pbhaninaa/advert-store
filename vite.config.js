import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'

function getBuildVersion() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
  } catch {
    return String(Date.now())
  }
}

// GitHub Pages serves from /advert-store/
export default defineConfig({
  base: '/advert-store/',
  define: {
    __ASSET_VERSION__: JSON.stringify(getBuildVersion()),
  },
  plugins: [vue(), tailwindcss()],
  build: {
    target: ['es2018', 'chrome64', 'edge79', 'firefox67', 'safari12'],
    cssTarget: 'chrome61',
  },
})
