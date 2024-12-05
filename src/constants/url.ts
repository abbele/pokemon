const TEAM_BASE_URL = 'https://interview-api.lotrek.io/pokemon-api/v1'

const TEAMS_API = {
  create: () => `${TEAM_BASE_URL}/teams`,
  get: (teamId: string) => `${TEAM_BASE_URL}/teams/${teamId}`,
  update: (teamId: string) => `${TEAM_BASE_URL}/teams/${teamId}`,
  add_pokemon: (teamId: number) => `${TEAM_BASE_URL}/teams/${teamId}/add-pokemon`,
  remove_pokemon: (teamId: string, pokemonId: number) =>
    `${TEAM_BASE_URL}/teams/${teamId}/remove-pokemon/${pokemonId}`,
}

const TEAMS_URL = {
  base: (id: number) => `/team/${id}`,
}

const POKEMON = {
  base: () => '/',
  detail: (id: string) => `/${id}`,
}

const LOCAL_STORAGE_TEAM = 'team'

export { TEAMS_API as TEAMS, TEAMS_URL, POKEMON, LOCAL_STORAGE_TEAM }
