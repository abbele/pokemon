import type { IPokemon } from './pokemon'

export interface ITeam {
  id: string
  name: string
  description: string
  pokemon?: IPokemonTeam[]
}

export interface IPokemonTeam {
  id: number
  name: string
  sprites: IPokemonSprite
  types: {
    name: string
  }[]
  abilities: IPokemonValues[]
  stats: IPokemonStat[]
}

export interface IPokemonSprite {
  front_default: string
  back_default: string
}

export interface IPokemonValues {
  id: number
  value: string
}

export interface IPokemonStat {
  name: string
  stat: number
}

export interface IPokemonTeamPayload {
  id: number
  name: string
  sprites: SpritesTeamPayload
  types?: TypeTeamPayload[]
  stats?: StatsTeamPayload[]
  abilities?: EntityTeamPayload[]
}

export interface SpritesTeamPayload {
  front_default: string
  back_default?: string
}

export interface TypeTeamPayload {
  name: string
}

export interface EntityTeamPayload {
  name: string
}

export interface StatsTeamPayload {
  stat: number
  name: string
}

export interface ITeamOptions {
  name: string
  description: string
  pokemon?: IPokemon[]
  id?: string
}

export interface ITeamCreateResponse {
  id: number
  name: string
  description: string
  members: IPokemonTeam[]
}
