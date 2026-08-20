import { useFetcher } from '@/core/hooks/use-fetcher'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import type { ClientError } from 'graphql-request'
import type {
  RemoverServicoMutation,
  SalvarServicoMutation
} from '@/core/graphql/graphql'
import { DELETE_SERVICO_MUTATION } from '@/modules/servico-core/data/servico'
import { SALVAR_SERVICO_MUTATION } from '../data/servico'

type salvarServicoInput = {
  id?: string
  nome: string
  descricao: string
  precoPequeno: number
  precoMedio: number
  precoGrande: number
}

export const useServicoEdicaoHandler = () => {
  const navigate = useNavigate()
  const fetch = useFetcher()
  const queryClient = useQueryClient()

  const removerServico = useMutation<
    RemoverServicoMutation,
    ClientError,
    string
  >({
    mutationKey: ['servico-remocao-mutation'],
    mutationFn: (id: string) => {
      return fetch(DELETE_SERVICO_MUTATION, {
        id
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['servicos-paged-query'],
        refetchType: 'all'
      })
    }
  })

  const salvarServico = useMutation<
    SalvarServicoMutation,
    ClientError,
    salvarServicoInput
  >({
    mutationKey: ['servico-salvar-mutation'],
    mutationFn: (input: salvarServicoInput) => {
      return fetch(SALVAR_SERVICO_MUTATION, {
        filterInput: input
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['servicos-paged-query'],
        refetchType: 'all'
      })
    }
  })

  const cancelar = () => {
    navigate('/servicos')
  }
  const remover = (id: string) => {
    removerServico.mutate(id, {
      onSuccess: () => {
        toast.success('Serviço removido com sucesso')
        navigate('/servicos')
      },
      onError: error => {
        toast.error('Erro ao remover serviço')
        console.error('Erro: ' + error?.response?.errors?.[0]?.message)
      }
    })
  }
  const salvar = async (input: salvarServicoInput) => {
    try {
      const servico = await salvarServico.mutateAsync(input)
      toast.success(`Serviço ${servico.salvarServico?.nome} salvo com sucesso`)
      navigate('/servicos')
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
