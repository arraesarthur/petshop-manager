import { useFetcher } from '@/core/hooks/use-fetcher'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { ServicoQuery, ServicoQueryVariables } from '@/core/graphql/graphql'
import { SERVICO_QUERY } from '../data/servico'

export const useServicoEdicaoQuery = (id: string) => {
  const fetch = useFetcher()
  const {
    data,
    error,
    isFetching: loading
  } = useQuery<ServicoQuery, ServicoQueryVariables>({
    queryKey: ['servico', id],
    queryFn: async () => {
      return fetch(SERVICO_QUERY, { id: id! })
    },
    enabled: !!id,
    placeholderData: keepPreviousData
  })
  return {
    servico: data?.servico,
    error,
    loading
  }
}
