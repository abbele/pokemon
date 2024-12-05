<script setup lang="ts">
import { ref } from 'vue'

import Carousel from 'primevue/carousel'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import Fieldset from 'primevue/fieldset'

import { useTeam } from '@/composable/useTeam'

import ModalTeam from '@/components/ModalTeam.vue'

import { useModalStore } from '@/stores/modal'
import { useNotificationStore } from '@/stores/notification'
import TheContainer from '@/components/TheContainer.vue'
import { removeLocalStorage } from '@/services/local-storage'
import { LOCAL_STORAGE_TEAM, POKEMON } from '@/constants/url'
import router from '@/router'

const { id } = defineProps({
  id: String,
})

const modal = useModalStore()
const storeNotifications = useNotificationStore()

const { getTeam, removePokemon } = useTeam()
const { mutate } = removePokemon()
const { data, refetch } = getTeam(id!)

const handleRemove = (teamId: string, pokemonId: number) => {
  mutate(
    { teamId, pokemonId },
    {
      onSuccess: () => {
        storeNotifications.addNotification({
          type: 'success',
          message: 'Pokemon removed successfully',
        })
        refetch()
      },
    },
  )
}

const handleUpdate = () => {
  modal.open({
    component: ModalTeam,
    componentProps: {
      id,
    },
  })
}

const responsiveOptions = ref([
  {
    breakpoint: '1280px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '479px',
    numVisible: 1,
    numScroll: 1,
  },
])

const handleRemoveTeam = () => {
  removeLocalStorage(LOCAL_STORAGE_TEAM)
  router.push(POKEMON.base())
}
</script>

<template>
  <TheContainer class="root">
    <div v-if="data" class="m-auto">
      <Fieldset legend="Info" pt:content:class="flex flex-col gap-4 justify-center">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-stretch w-full">
          <Card class="grow w-full">
            <template #title>Name</template>
            <template #content>
              <p class="m-0">{{ data.name }}</p>
            </template>
          </Card>
          <Card class="grow w-full">
            <template #title>Description</template>
            <template #content>
              <p class="m-0">{{ data.description }}</p>
            </template>
          </Card>
        </div>
        <div class="text-right">
          <Button label="Update" severity="primary" class="mt-2 mr-2" @click="handleUpdate" />
          <Button label="Remove" severity="danger" class="mt-2" @click="handleRemoveTeam" />
        </div>
      </Fieldset>
      <div class="w-full max-w-4xl mx-auto p-4">
        <Carousel
          :value="data.team"
          :numVisible="3"
          :numScroll="1"
          :circular="true"
          :responsiveOptions="responsiveOptions"
        >
          <template #item="slotProps">
            <div
              class="transition-all duration-300 ease-in-out flex justify-center items-center relative m-2"
            >
              <Card
                class="w-full max-w-xs overflow-hidden flex flex-col items-center justify-center p-5 border border-gray-300 rounded-lg shadow-lg"
              >
                <template #header>
                  <img :src="slotProps.data.sprites?.front_default" :alt="slotProps.data.name" />
                </template>
                <template #title>
                  {{ slotProps.data.name }}
                </template>
                <template #content>
                  <div class="flex gap-1">
                    <Chip
                      v-for="(type, index) in slotProps.data.types"
                      :key="index"
                      :label="type.name"
                    />
                  </div>
                </template>
                <template #footer>
                  <div class="mt-1">
                    <Button
                      label="Remove"
                      severity="danger"
                      class="w-full h-8"
                      @click="() => handleRemove(id!, slotProps.data.id)"
                    />
                  </div>
                </template>
              </Card>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </TheContainer>
</template>

<style scoped>
.root {
  height: 100%;
  overflow: scroll;
  margin: auto;
  padding: 25px;
}
</style>
