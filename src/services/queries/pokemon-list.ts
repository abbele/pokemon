import gql from 'graphql-tag'

const GET_POKEMON = gql`
  query getPokemons($limit: Int = 25, $offset: Int = 0, $where: pokemon_v2_pokemon_bool_exp) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: $where) {
      id
      name
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        front_default: sprites(path: "front_default")
        back_default: sprites(path: "back_default")
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          id
          name
        }
      }
    }
  }
`

export default GET_POKEMON
