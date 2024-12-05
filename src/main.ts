import { createApp, h, provide } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'

import { apolloClient } from './client/graphql-client'

import './assets/main.css'

const pinia = createPinia()

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.use(router)
app.use(VueQueryPlugin)
app.use(pinia)
app.use(ToastService)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
