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
  <header><Button label="Team" variant="link" @click="handleClick" /></header>
</template>

<style scoped></style>
