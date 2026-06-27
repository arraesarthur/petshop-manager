import { useFetcher } from '@/core/hooks/use-fetcher'
import { useQuery } from '@tanstack/react-query'
import { RACAS_QUERY } from '../data/pet'

export const useRacasQuery = (especie: string) => {
  const fetch = useFetcher()
  const { data, isFetching: loading } = useQuery({
    queryKey: ['racas', especie],
    queryFn: async () => fetch(RACAS_QUERY, { especie }),
    enabled: !!especie
  })

  return {
    racas: data?.racas ?? [],
    loading
  }
}