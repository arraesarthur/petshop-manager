import { useFetcher } from "@/core/hooks/use-fetcher"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { CLIENTE_QUERY } from "../data/cliente"
import type { ClienteQuery, ClienteQueryVariables } from "@/core/graphql/graphql"

export const useClienteEdicaoQuery = (id: string) => {
     const fetch = useFetcher()
     const { data, error, isFetching: loading } = useQuery<ClienteQuery, ClienteQueryVariables>({
    queryKey: ['cliente', id],
    queryFn: async () => {
      return fetch(CLIENTE_QUERY, {id:id!})
    },
    enabled: !!id,
    placeholderData: keepPreviousData
  })
    return {
        cliente: data?.cliente,
        error,
        loading
    }
}