<script setup lang="ts">
import { watch } from 'vue'

import PokedexList from '@/components/PokedexList.vue'
import PokedexListFilters from '@/components/PokedexListFilters.vue'
import TheContainer from '@/components/TheContainer.vue'
import TheObserver from '@/components/TheObserver.vue'

import { usePokemon } from '@/composable/usePokemon'

const { list: pokemonList, filters, handleFilters, loadMore, refetch } = usePokemon({})

watch(filters, () => {
  const fetch = () => {
    refetch({
      where: {
        name: { _iregex: filters.name },
      },
    })
  }

  fetch()
})
</script>

<template>
  <div class="root">
    <TheContainer>
      <PokedexListFilters :name="filters.name" @update:name="handleFilters" />
      <PokedexList :list="pokemonList" @fetchMore="loadMore" />
      <TheObserver @enter-viewport="loadMore" />
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
