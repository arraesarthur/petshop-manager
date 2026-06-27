import { rowsPerPageOptions } from '@/core/utils/rows-per-page'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PaginationState } from '@tanstack/react-table'
import { useMemo, useState, useEffect } from 'react'
import { useFetcher } from '@/core/hooks/use-fetcher'
import { PETS_QUERY } from '../data/pet'
import type { ClientesQuery, ClientesQueryVariables, PetsPagedQuery, PetsPagedQueryVariables } from '@/core/graphql/graphql'
import { CLIENTES_QUERY } from '@/modules/pet-core/cliente'

export const usePetListagem = () => {
  const fetch = useFetcher()

  const [busca, setBusca] = useState('')
  const [debouncedBusca, setDebouncedBusca] = useState('')
  const [clienteId, setClienteId] = useState<number | undefined>()

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: rowsPerPageOptions[0] || 10
  })

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBusca(busca)
      setPagination(prev => ({ ...prev, pageIndex: 0 }))
    }, 500)

    return () => clearTimeout(handler)
  }, [busca])

  const variables = useMemo(
    () => ({
      filterInput: {
        busca: debouncedBusca,
        clienteId,
        page: pagination.pageIndex,
        size: pagination.pageSize
      }
    }),
    [debouncedBusca, clienteId, pagination.pageIndex, pagination.pageSize]
  )
  const {
    data,
    error,
    isFetching: loading
  } = useQuery<PetsPagedQuery, PetsPagedQueryVariables>({
    queryKey: ['pets-paged-query', variables],
    queryFn: async () => fetch(PETS_QUERY, variables),
    placeholderData: keepPreviousData
  })

  const {
    data: dataClientes
  } = useQuery<ClientesQuery, ClientesQueryVariables>({
    queryKey: ['clientes-query'],
    queryFn: async () => fetch(CLIENTES_QUERY),
    placeholderData: keepPreviousData
  })

  return {
    data: data?.pets?.content ?? [],
    totalElements: data?.pets?.totalElements ?? 0,
    error,
    loading,
    busca,
    setBusca,
    clienteId,
    setClienteId,
    pagination,
    setPagination,
    clientes: dataClientes?.clientes ?? []
  }
}
