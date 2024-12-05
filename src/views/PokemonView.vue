<script setup lang="ts">
import { computed } from 'vue'
import { Card, Panel, Chip, ProgressBar, ProgressSpinner, Button } from 'primevue'

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
  <div class="root h-full w-full m-auto p-5">
    <TheContainer class="h-full overflow-scroll">
      <div v-if="item" class="flex flex-col md:flex-row gap-8">
        <div class="grow text-center">
          <h1 class="font-bold text-xl mb-8">{{ item.name.toUpperCase() }}</h1>

          <div class="flex justify-center mb-8">
            <Card class="w-64 pokemon-image-card">
              <template #content>
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front shake-y">
                      <img :src="item.sprites.front_default" :alt="`${item.name} front`" />
                    </div>
                    <div class="flip-card-back">
                      <img :src="item.sprites.back_default" :alt="`${item.name} back`" />
                    </div>
                  </div>
                </div>
              </template>
            </Card>
          </div>

          <Panel header="Basic Information">
            <div class="grid text-left">
              <div class="col-6"><strong>ID:</strong> {{ item.id }}</div>
            </div>
            <div class="gap-4 mt-1 text-right">
              <Button
                label="Add to team"
                severity="success"
                class=""
                @click="() => handleAddToTeam(item)"
              />
            </div>
          </Panel>
        </div>

        <div class="flex flex-col gap-5 grow">
          <Panel header="Types">
            <div class="flex gap-2">
              <Chip v-for="type in item.types" :key="type" :label="type" />
            </div>
          </Panel>

          <Panel header="Stats">
            <ProgressBar
              v-for="stat in item.stats"
              :key="stat.name"
              :value="stat.stat"
              class="mb-2"
            >
              {{ stat.name }}: {{ stat.stat }}
            </ProgressBar>
          </Panel>

          <Panel header="Abilities">
            <ul>
              <li v-for="ability in item.abilities" :key="ability.id">
                {{ ability.value }}
              </li>
            </ul>
          </Panel>
        </div>
      </div>
      <div v-else>
        <ProgressSpinner />
      </div>
    </TheContainer>
  </div>
</template>

<style scoped>
/* Flip Card Styles */
.flip-card {
  background-color: transparent;
  width: 100%;
  height: 250px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.pokemon-image-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.flip-card-front {
  z-index: 2;
}

.flip-card-back {
  transform: rotateY(180deg);
  z-index: 1;
}

.flip-card-front img,
.flip-card-back img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

@keyframes shakeY {
  0%,
  100% {
    transform: translateY(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateY(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateY(5px);
  }
}

.shake-y {
  animation: shakeY 1.5s;
}
</style>
