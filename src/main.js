import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import activeTheme from './themes/active.js'
import { applyTheme } from './utils/applyTheme.js'

try {
  applyTheme(activeTheme)
  createApp(App).mount('#app')
} catch (error) {
  console.error(error)
  const app = document.getElementById('app')
  if (app) {
    app.innerHTML =
      '<p style="padding:2rem;text-align:center;font-family:sans-serif">Unable to load the store. Please refresh the page or try a newer browser.</p>'
  }
}
