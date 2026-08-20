import { rowsPerPageOptions } from '@/core/utils/rows-per-page'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { PaginationState } from '@tanstack/react-table'
import { useMemo, useState, useEffect } from 'react'
import { useFetcher } from '@/core/hooks/use-fetcher'
import type {
  ServicosPagedQuery,
  ServicosPagedQueryVariables
} from '@/core/graphql/graphql'
import { SERVICOS_QUERY } from '../data/servico'

export const useServicoListagem = () => {
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
  } = useQuery<ServicosPagedQuery, ServicosPagedQueryVariables>({
    queryKey: ['servicos-paged-query', variables],
    queryFn: async () => fetch(SERVICOS_QUERY, variables),
    placeholderData: keepPreviousData
  })

  return {
    data: data?.servicosPaged?.content ?? [],
    totalElements: data?.servicosPaged?.totalElements ?? 0,
    error,
    loading,
    busca,
    setBusca,
    pagination,
    setPagination
  }
}
