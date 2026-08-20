import { useFetcher } from '@/core/hooks/use-fetcher'
import { useQuery } from '@tanstack/react-query'
import { RACAS_QUERY } from '../data/pet'
import type { RacasQuery, RacasQueryVariables } from '@/core/graphql/graphql'

export const useRacasQuery = (especie: string) => {
  const fetch = useFetcher()
  const { data, isFetching: loading } = useQuery<RacasQuery, RacasQueryVariables>({
    queryKey: ['racas', especie],
    queryFn: async () => fetch(RACAS_QUERY, { especie }),
    enabled: !!especie
  })

  return {
    racas: data?.racas ?? [],
    loading
  }
}