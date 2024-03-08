import { createApp } from 'vue'
import { infiniteScrollPlugin } from 'vue-3-infinite-scroll-directive-plugin'
import App from './App.vue'

createApp(App).use(infiniteScrollPlugin).mount('#app')
