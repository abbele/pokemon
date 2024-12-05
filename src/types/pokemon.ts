export interface IPokemonQueryResponse {
  pokemon_v2_pokemon: IPokemonResponse[]
}

export interface IPokemonResponse {
  id: number
  name: string
  pokemon_v2_pokemontypes: IPokemonTypeResponse[]
  pokemon_v2_pokemonsprites: IPokemonSprite[]
  pokemon_v2_pokemonabilities: IPokemonAbilityResponse[]
  pokemon_v2_pokemonstats: IPokemonStatResponse[]
}

export interface IPokemonTypeResponse {
  pokemon_v2_type: IPokemonType
}

export interface IPokemonType {
  name: string
}

export interface IPokemonSprite {
  front_default: string
  back_default: string
}

export interface IPokemonAbilityResponse {
  pokemon_v2_ability: IPokemonAbility
}

export interface IPokemonAbility {
  id: number
  name: string
}

export interface IPokemonStatResponse {
  pokemon_v2_stat: {
    name: string
  }
  base_stat: number
}

export interface IPokemon {
  id: string
  name: string
  sprites: IPokemonSprite
  types: string[]
  abilities: IPokemonValues[]
  stats: IPokemonStat[]
}

export interface IPokemonValues {
  id: number
  value: string
}

export interface IPokemonStat {
  name: string
  stat: number
}
