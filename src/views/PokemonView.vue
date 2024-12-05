<script setup lang="ts">
import { computed } from 'vue'
import Card from 'primevue/card'

import { useModalStore } from '@/stores/modal'
import { useNotificationStore } from '@/stores/notification'

import { usePokemon } from '@/composable/usePokemon'
import { useTeam } from '@/composable/useTeam'

import { getLocalStorage } from '@/services/local-storage'
import { LOCAL_STORAGE_TEAM } from '@/constants/url'

import type { IPokemon } from '@/types/pokemon'
import TheContainer from '@/components/TheContainer.vue'
import ModalTeam from '@/components/ModalTeam.vue'

const { id } = defineProps({
  id: String,
})
const modal = useModalStore()
const storeNotifications = useNotificationStore()
const { addPokemon } = useTeam()
const { mutate } = addPokemon()

const { list: pokemonList } = usePokemon({ id })
const item = computed(() => pokemonList.value[0])

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
  <div class="root">
    <TheContainer>
      <Card v-if="item">
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
              label="Add to team"
              severity="success"
              class="w-full"
              @click="() => handleAddToTeam(item)"
            />
          </div>
        </template>
      </Card>
    </TheContainer>
  </div>
</template>

<style scoped>
.root {
  height: 100%;
  overflow: scroll;
  margin: auto;
}

.root > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
