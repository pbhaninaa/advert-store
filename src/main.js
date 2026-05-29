import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import activeTheme from './themes/active.js'
import { applyTheme } from './utils/applyTheme.js'

applyTheme(activeTheme)

createApp(App).mount('#app')
