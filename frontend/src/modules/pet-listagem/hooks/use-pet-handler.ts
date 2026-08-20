import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useFetcher } from '@/core/hooks/use-fetcher'
import { toast } from 'sonner'
import { DELETE_PET_MUTATION } from '@/modules/pet-core/pet'
import type { ClientError } from 'graphql-request'
import type { RemoverPetMutation } from '@/core/graphql/graphql'

export const usePetHandler = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const fetch = useFetcher()

  const removerPet = useMutation<RemoverPetMutation, ClientError, string>({
    mutationKey: ['pet-remocao-mutation'],
    mutationFn: (id: string) => {
      return fetch(DELETE_PET_MUTATION, {
        id
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets-paged-query']
      })

      queryClient.refetchQueries({
        queryKey: ['pets-paged-query']
      })
    }
  })

  const handleEditar = (id: string) => {
    navigate(`/editar/pets/${id}`)
  }
  const handleRemover = (id: string) => {
    removerPet.mutate(id, {
      onSuccess: () => {
        toast.success('Pet removido com sucesso')
      },
      onError: error => {
        toast.error('Erro: ' + error?.response?.errors?.[0]?.message)
      }
    })
  }
  return {
    handleEditar,
    handleRemover
  }
}
