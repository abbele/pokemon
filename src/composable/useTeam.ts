import { useMutation, useQuery } from '@tanstack/vue-query'
import {
  addPokemonToTeamApi,
  createTeamApi,
  getTeamApi,
  removePokemonFromTeamApi,
  updateTeamApi,
} from '@/services/team'
import type { IPokemon } from '@/types/pokemon'
import type { ITeamCreateResponse, ITeamOptions } from '@/types/team'

export const useTeam = () => {
  const getTeam = (id: string) =>
    useQuery({
      queryKey: ['getTeam', id],
      queryFn: () => getTeamApi(id),
      select: (res) => ({
        name: res.data.name,
        description: res.data.description,
        team: res.data.members,
      }),
    })
  const createTeam = () =>
    useMutation({
      mutationKey: ['createTeam'],
      mutationFn: (options: ITeamOptions) => createTeamApi<ITeamCreateResponse>(options),
    })
  const updateTeam = () =>
    useMutation({
      mutationKey: ['updateTeam'],
      mutationFn: (options: ITeamOptions) =>
        updateTeamApi(options.id!, { name: options.name, description: options.description }),
    })

  const addPokemon = () =>
    useMutation({
      mutationKey: ['addPokemon'],
      mutationFn: (options: { teamId: number; pokemon: IPokemon }) =>
        addPokemonToTeamApi(options.pokemon, options.teamId),
    })

  const removePokemon = () =>
    useMutation({
      mutationKey: ['removePokemon'],
      mutationFn: (options: { teamId: string; pokemonId: number }) =>
        removePokemonFromTeamApi(options.teamId, options.pokemonId),
    })

  return {
    getTeam,
    createTeam,
    updateTeam,
    addPokemon,
    removePokemon,
  }
}
