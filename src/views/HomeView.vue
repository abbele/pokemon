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
  <div class="root h-full m-auto p-5">
    <TheContainer class="h-full overflow-scroll">
      <PokedexListFilters :name="filters.name" @update:name="handleFilters" />
      <div class="overflow-scroll mt-5 mb-5 h-full">
        <PokedexList :list="pokemonList" @fetchMore="loadMore" />
      </div>
      <TheObserver @enter-viewport="loadMore" />
    </TheContainer>
  </div>
</template>
