import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useFetcher } from '@/core/hooks/use-fetcher'
import { toast } from 'sonner'
import type { ClientError } from 'graphql-request'
import type { RemoverServicoMutation } from '@/core/graphql/graphql'
import { DELETE_SERVICO_MUTATION } from '@/modules/servico-core/data/servico'

export const useServicoHandler = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const fetch = useFetcher()

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
        queryKey: ['servicos-paged-query']
      })

      queryClient.refetchQueries({
        queryKey: ['servicos-paged-query']
      })
    }
  })

  const handleEditar = (id: string) => {
    navigate(`/editar/servicos/${id}`)
  }
  const handleRemover = (id: string) => {
    removerServico.mutate(id, {
      onSuccess: () => {
        toast.success('Serviço removido com sucesso')
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
