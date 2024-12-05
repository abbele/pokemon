<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'

import router from '@/router'
import type { IPokemon } from '@/types/pokemon'
import { LOCAL_STORAGE_TEAM, POKEMON } from '@/constants/url'
import { getLocalStorage } from '@/services/local-storage'
import { useModalStore } from '@/stores/modal'
import { useNotificationStore } from '@/stores/notification'
import ModalTeam from '@/components/ModalTeam.vue'
import { useTeam } from '@/composable/useTeam'

const { list } = defineProps({
  list: Array<IPokemon>,
})
const modal = useModalStore()
const storeNotifications = useNotificationStore()
const { addPokemon } = useTeam()
const { mutate } = addPokemon()

const handleClickDetail = (id: string) => {
  router.push(POKEMON.detail(id))
}

const handleAddToTeam = (item: IPokemon) => {
  const idTeam = getLocalStorage(LOCAL_STORAGE_TEAM)

  if (idTeam) {
    mutate(
      { teamId: idTeam, pokemon: item },
      {
        onSuccess: () => {
          storeNotifications.addNotification({
            type: 'success',
            message: 'Pokemon added to team successfully',
          })
        },
      },
    )
  } else {
    modal.open({
      component: ModalTeam,
      componentProps: {
        pokemon: item,
      },
    })
  }
}
</script>

<template>
  <div>
    <div class="grid-container">
      <Card class="grid-item" v-for="item in list" :key="item.id">
        <template #header>
          <img :src="item.sprites.front_default" :alt="item.name" />
        </template>
        <template #title>
          {{ item.name }}
        </template>
        <template #content>
          <ul>
            <li v-for="(type, index) in item.types" :key="index">
              {{ type }}
            </li>
          </ul>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button
              label="Detail"
              severity="secondary"
              outlined
              class="w-full"
              @click="() => handleClickDetail(item.id)"
            />
            <Button
              label="Add to team"
              severity="success"
              class="w-full"
              @click="() => handleAddToTeam(item)"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
