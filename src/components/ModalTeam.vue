<script setup lang="ts">
import router from '@/router'
import { useModalStore } from '@/stores/modal'
import { useNotificationStore } from '@/stores/notification'

import { Button, InputText } from 'primevue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { useTeam } from '@/composable/useTeam'
import { setLocalStorage } from '@/services/local-storage'
import type { IPokemon } from '@/types/pokemon'
import { LOCAL_STORAGE_TEAM, TEAMS_URL } from '@/constants/url'

const { pokemon, id } = defineProps<{ pokemon?: IPokemon; id?: string }>()

const modal = useModalStore()
const storeNotifications = useNotificationStore()

const { createTeam, addPokemon, updateTeam } = useTeam()
const { mutate: mutateTeam } = createTeam()
const { mutate: mutatePokemon } = addPokemon()
const { mutate: mutateUpdateTeam } = updateTeam()

const handleSubmit = (event: FormSubmitEvent) => {
  const options = {
    name: event.states.name.value,
    description: event.states.description.value,
  }

  if (id) {
    mutateUpdateTeam(
      { ...options, id },
      {
        onSuccess: (res) => {
          storeNotifications.addNotification({
            type: 'success',
            message: 'Team updated successfully',
          })
          modal.close()
          router.push(TEAMS_URL.base(res.data.id))
        },
      },
    )
  }

  mutateTeam(options, {
    onSuccess: (res) => {
      storeNotifications.addNotification({
        type: 'success',
        message: 'Team created successfully',
      })

      if (pokemon) {
        mutatePokemon(
          { teamId: res.data.id, pokemon },
          {
            onSuccess: () => {
              storeNotifications.addNotification({
                type: 'success',
                message: 'Pokemon added to team successfully',
              })
              modal.close()
              setLocalStorage(LOCAL_STORAGE_TEAM, res.data.id)
              router.push(TEAMS_URL.base(res.data.id))
            },
          },
        )
      }
    },
  })
}

const handleClose = () => {
  modal.close()
}
</script>

<template>
  <Form @submit="handleSubmit">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Crea la tua squadra</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="name" class="font-semibold w-24">Nome</label>
      <InputText id="name" name="name" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="description" class="font-semibold w-24">Descrizione</label>
      <InputText id="description" name="description" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="handleClose"></Button>
      <Button type="submit" label="Save"></Button>
    </div>
  </Form>
</template>

<style scoped></style>
