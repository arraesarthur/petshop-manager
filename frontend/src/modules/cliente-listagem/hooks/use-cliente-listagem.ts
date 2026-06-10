import type {
  ClientesPagedQuery,
  ClientesPagedQueryVariables
} from '@/core/graphql/graphql'
import { rowsPerPageOptions } from '@/core/utils/rows-per-page'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PaginationState } from '@tanstack/react-table'
import { useMemo, useState, useEffect } from 'react'
import { CLIENTES_QUERY } from '../data/cliente'
import { useFetcher } from '@/core/hooks/use-fetcher'

export const useClienteListagem = () => {
  const fetch = useFetcher()

  const [busca, setBusca] = useState('')
  const [debouncedBusca, setDebouncedBusca] = useState('')

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
        page: pagination.pageIndex,
        size: pagination.pageSize
      }
    }),
    [debouncedBusca, pagination.pageIndex, pagination.pageSize]
  )

  const {
    data,
    error,
    isFetching: loading
  } = useQuery<
    { clientes: ClientesPagedQuery },
    ClientesPagedQueryVariables
  >({
    queryKey: ['clientes-paged-query', variables],
    queryFn: async () => fetch(CLIENTES_QUERY, variables),
    placeholderData: keepPreviousData
  })
  return {
    data: data?.clientes?.content ?? [],
    totalElements: data?.clientes?.totalElements ?? 0,
    error,
    loading,
    busca,
    setBusca,
    pagination,
    setPagination
  }
}