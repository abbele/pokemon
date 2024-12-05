import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const BASE_URL_GRAPHQL = 'https://beta.pokeapi.co/graphql/v1beta'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: BASE_URL_GRAPHQL,
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export { apolloClient }
