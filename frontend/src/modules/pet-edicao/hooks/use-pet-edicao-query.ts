import { useFetcher } from "@/core/hooks/use-fetcher"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { PET_QUERY } from "../data/pet"

export const usePetEdicaoQuery = (id: string) => {
     const fetch = useFetcher()
     const { data, error, isFetching: loading } = useQuery({
    queryKey: ['pet', id],
    queryFn: async () => {
      return fetch(PET_QUERY, {id:id!})
    },
    enabled: !!id,
    placeholderData: keepPreviousData
  })
    return {
        pet: data?.pet,
        error,
        loading
    }
}