import { GraphQLClient } from 'graphql-request'
import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL)

export const useFetcher = () => {
  const auth = useContext(AuthContext)
  return async <T, V extends object>(query: string, variables?: V) => {
    const requestHeaders = {
      'Content-Type': 'application/json'
    }

    if (auth) {
      requestHeaders['Authorization'] = `Bearer ${auth.token}`
    }

    return client.request<T>(query, variables, requestHeaders)
  }
}
