<script setup lang="ts">
import Card from 'primevue/card'

import { useTeam } from '@/composable/useTeam'

import ModalTeam from '@/components/ModalTeam.vue'

import { useModalStore } from '@/stores/modal'
import { useNotificationStore } from '@/stores/notification'

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
</script>

<template>
  <div v-if="data">
    <div>
      <Card>
        <template #title>Name</template>
        <template #content>
          <p class="m-0">{{ data.name }}</p>
        </template>
      </Card>
      <Card>
        <template #title>Description</template>
        <template #content>
          <p class="m-0">{{ data.description }}</p>
        </template>
      </Card>
      <Button label="Update" severity="danger" class="w-full" @click="handleUpdate" />
    </div>
    <div>
      <Card class="grid-item" v-for="item in data.team" :key="item.id">
        <template #header>
          <img :src="item.sprites?.front_default" :alt="item.name" />
        </template>
        <template #title>
          {{ item.name }}
        </template>
        <template #content>
          <ul>
            <li v-for="(type, index) in item.types" :key="index">
              {{ type.name }}
            </li>
          </ul>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button
              label="Remove"
              severity="danger"
              class="w-full"
              @click="() => handleRemove(id!, item.id)"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
