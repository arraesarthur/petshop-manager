import { GraphQLClient } from 'graphql-request'
import { useContext } from 'react'
import { AuthContext } from '../context/auth-context'
import { useNavigate } from 'react-router-dom'

const client = new GraphQLClient(import.meta.env.VITE_GRAPHQL_URL)

export const useFetcher = () => {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()
  return async <T, V extends object>(query: string, variables?: V) => {
    const expiresAt = localStorage.getItem('expiresAt')

    if (Number(expiresAt) <= Date.now()) {
      localStorage.clear()
      navigate('/login')
      throw new Error('Token expirado')
    }
    const requestHeaders = {
      'Content-Type': 'application/json'
    }

    if (auth) {
      requestHeaders['Authorization'] = `Bearer ${auth.token}`
    }

    return client.request<T>(query, variables, requestHeaders)
  }
}
