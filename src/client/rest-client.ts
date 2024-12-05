import axios from 'axios'

const BASE_URL_REST = 'https://interview-api.lotrek.io/pokemon-api/v1'

const axiosClient = axios.create({
  baseURL: BASE_URL_REST,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
})

export { axiosClient }
