import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useFetcher } from '@/core/hooks/use-fetcher'
import { DELETE_CLIENTE_MUTATION } from '@/modules/cliente-core/data/cliente'
import { toast } from 'sonner'
import type { ClientError } from 'graphql-request'
import type { RemoverClienteMutation } from '@/core/graphql/graphql'

export const useClienteHandler = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const fetch = useFetcher()

  const removerCliente = useMutation<
    RemoverClienteMutation,
    ClientError,
    string
  >({
    mutationKey: ['cliente-remocao-mutation'],
    mutationFn: (id: string) => {
      return fetch(DELETE_CLIENTE_MUTATION, {
        id
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clientes-paged-query']
      })

      queryClient.refetchQueries({
        queryKey: ['clientes-paged-query']
      })
    }
  })

  const handleEditar = (id: string) => {
    navigate(`/editar/clientes/${id}`)
  }
  const handleRemover = (id: string) => {
    removerCliente.mutate(id, {
      onSuccess: () => {
        toast.success('Cliente removido com sucesso')
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
