import type { IPokemon } from '@/types/pokemon'
import type { IPokemonTeamPayload } from '@/types/team'

const trasformPokemonPayloadToAdd = (pokemon: IPokemon): IPokemonTeamPayload => {
  return {
    id: parseInt(pokemon.id),
    name: pokemon.name,
    sprites: {
      front_default: pokemon.sprites.front_default,
      back_default: pokemon.sprites.back_default,
    },
    types: pokemon.types.map((type) => ({ name: type })),
    abilities: pokemon.abilities?.map((ability) => ({ name: ability.value })),
    stats: pokemon.stats.map((stat) => ({ name: stat.name, stat: stat.stat })),
  }
}

export { trasformPokemonPayloadToAdd }
