import { axiosClient } from '@/client/rest-client'
import { TEAMS } from '@/constants/url'
import { trasformPokemonPayloadToAdd } from '@/models/team'
import type { ITeamCreateResponse, ITeamOptions } from '@/types/team'
import type { IPokemon } from '@/types/pokemon'

const getTeamApi = (id: string) => axiosClient.get<ITeamCreateResponse>(TEAMS.get(id))
const addPokemonToTeamApi = (pokemon: IPokemon, idTeam: number) => {
  const payload = trasformPokemonPayloadToAdd(pokemon)

  return axiosClient.post(TEAMS.add_pokemon(idTeam), payload)
}

const removePokemonFromTeamApi = (idTeam: string, idPokemon: number) =>
  axiosClient.delete(TEAMS.remove_pokemon(idTeam, idPokemon))

const createTeamApi = <T>(options: ITeamOptions) => axiosClient.post<T>(TEAMS.create(), options)

const updateTeamApi = (id: string, options: ITeamOptions) =>
  axiosClient.patch(TEAMS.update(id), options)

export { getTeamApi, addPokemonToTeamApi, removePokemonFromTeamApi, createTeamApi, updateTeamApi }
