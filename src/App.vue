<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useQueryClient } from '@tanstack/vue-query'

import { axiosClient } from './client/rest-client'
import { useNotificationStore } from './stores/notification'

import Footer from '@/components/TheFooter.vue'
import Header from '@/components/TheHeader.vue'
import TheModal from '@/components/TheModal.vue'
import TheNotification from '@/components/TheNotification.vue'

const queryClient = useQueryClient()
queryClient.invalidateQueries({ queryKey: ['getTeam'] })

const storeNotifications = useNotificationStore()

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    storeNotifications.addNotification({
      type: 'error',
      message: error.response.data.detail ?? error.message,
    })
    return Promise.reject(error)
  },
)
</script>

<template>
  <main>
    <Header />
    <RouterView />
    <Footer />
    <TheModal />
    <TheNotification />
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: 80px minmax(auto, calc(100vh - 80px - 80px)) 80px;
}
</style>
