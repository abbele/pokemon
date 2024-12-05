<script setup lang="ts">
import { Button } from 'primevue'

import router from '@/router'

import { LOCAL_STORAGE_TEAM, TEAMS_URL } from '@/constants/url'
import { getLocalStorage } from '@/services/local-storage'
import { useModalStore } from '@/stores/modal'

import ModalTeam from '@/components/ModalTeam.vue'

const modal = useModalStore()

const handleClick = () => {
  const idTeam = getLocalStorage(LOCAL_STORAGE_TEAM)

  if (!idTeam) {
    modal.open({
      component: ModalTeam,
    })
    return
  }

  router.push(TEAMS_URL.base(idTeam))
}
</script>

<template>
  <header class="flex items-center justify-between pl-4 pr-4">
    <span>Pokedex</span>
    <Button label="Team" variant="link" @click="handleClick" class="ml-auto" />
  </header>
</template>

<style scoped>
header {
  background-color: #8b0000;
  box-shadow: 0 9px #5e0000;
  -webkit-box-shadow: 0 9px #5e0000;
  -moz-box-shadow: 0 9px #5e0000;
  -o-box-shadow: 0 9px #5e0000;
  color: white;
}
</style>
