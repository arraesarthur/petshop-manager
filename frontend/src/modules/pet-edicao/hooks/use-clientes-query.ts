import type {
  ClientesQuery,
  ClientesQueryVariables
} from '@/core/graphql/graphql'
import { useFetcher } from '@/core/hooks/use-fetcher'
import { CLIENTES_QUERY } from '@/modules/pet-core/cliente'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useCLientesQuery = () => {
  const fetch = useFetcher()
  const { data: dataClientes } = useQuery<
    ClientesQuery,
    ClientesQueryVariables
  >({
    queryKey: ['clientes-query'],
    queryFn: async () => fetch(CLIENTES_QUERY),
    placeholderData: keepPreviousData
  })

  return {
    clientes: dataClientes?.clientes ?? []
  }
}
