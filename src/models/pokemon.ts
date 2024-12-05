import type { IPokemon, IPokemonQueryResponse } from '@/types/pokemon'

export const transformPokemonListResponse = (response?: IPokemonQueryResponse): IPokemon[] => {
  if (!response?.pokemon_v2_pokemon) return []
  return response.pokemon_v2_pokemon.map((res) => ({
    id: res.id.toString(),
    name: res.name,
    sprites: res.pokemon_v2_pokemonsprites[0],
    types: res.pokemon_v2_pokemontypes.map((type) => type.pokemon_v2_type.name),
    abilities: res.pokemon_v2_pokemonabilities.map((ability) => ({
      id: ability.pokemon_v2_ability.id,
      value: ability.pokemon_v2_ability.name,
    })),
    stats: res.pokemon_v2_pokemonstats.map((stat) => ({
      name: stat.pokemon_v2_stat.name,
      stat: stat.base_stat,
    })),
  }))
}
