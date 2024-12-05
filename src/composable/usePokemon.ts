import { computed, reactive } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import { transformPokemonListResponse } from '@/models/pokemon'
import GET_POKEMON from '@/services/queries/pokemon-list'
import type { IPokemonQueryResponse } from '@/types/pokemon'

interface IUsePokemon {
  name?: string
  id?: string
}

export const usePokemon = ({ name, id }: IUsePokemon) => {
  const filters = reactive<IUsePokemon>({
    name,
    id,
  })

  const { result, fetchMore, refetch } = useQuery<IPokemonQueryResponse>(GET_POKEMON, {
    where: {
      name: { _iregex: filters.name },
      id: { _eq: filters.id },
    },
  })

  const pokemonList = computed(() => transformPokemonListResponse(result.value))
  const loadMore = () => {
    const currentLenght = result?.value?.pokemon_v2_pokemon?.length || 0
    if (currentLenght < 25) return
    fetchMore({
      variables: {
        offset: currentLenght,
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult

        return {
          ...previousResult,
          pokemon_v2_pokemon: [
            ...previousResult.pokemon_v2_pokemon,
            ...fetchMoreResult.pokemon_v2_pokemon,
          ],
        }
      },
    })
  }

  const handleFilters = (key: keyof typeof filters, value: string) => {
    filters[key] = value
  }

  return {
    list: pokemonList,
    filters,
    handleFilters,
    loadMore,
    refetch,
  }
}
