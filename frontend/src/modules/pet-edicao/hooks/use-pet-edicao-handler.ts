import { useFetcher } from '@/core/hooks/use-fetcher'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { DELETE_PET_MUTATION } from '@/modules/pet-core/pet'
import { SALVAR_PET_MUTATION } from '../data/pet'

type salvarPetInput = {
  id?: string
  nome: string
  telefone: string
  instagram: string
  endereco: string
}

export const usePetEdicaoHandler = () => {
  const navigate = useNavigate()
  const fetch = useFetcher()
  const queryClient = useQueryClient()

  const removerPet = useMutation({
    mutationKey: ['pet-remocao-mutation'],
    mutationFn: (id: string) => {
      return fetch(DELETE_PET_MUTATION, {
        id
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets-paged-query'],
        refetchType: 'all'
      })
    }
  })

  const salvarPet = useMutation({
    mutationKey: ['pet-salvar-mutation'],
    mutationFn: (input: salvarPetInput) => {
      return fetch(SALVAR_PET_MUTATION, {
        filterInput: input
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets-paged-query'],
        refetchType: 'all'
      })
    }
  })

  const cancelar = () => {
    navigate('/pets')
  }
  const remover = (id: string) => {
    removerPet.mutate(id, {
      onSuccess: () => {
        toast.success('Pet removido com sucesso')
        navigate('/pets')
      },
      onError: error => {
        toast.error('Erro ao remover pet')
        console.error('Erro: ' + error?.response?.errors?.[0]?.message)
      }
    })
  }
  const salvar = async (input: salvarPetInput) => {
    try {
      const pet = await salvarPet.mutateAsync(input)
      toast.success(`Pet ${pet.salvarPet.nome} salvo com sucesso`)
      navigate('/pets')
    } catch (error) {
      toast.error('Erro: ' + error?.response?.errors?.[0]?.message)
    }
  }
  return {
    cancelar,
    remover,
    salvar
  }
}
