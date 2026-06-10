import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useFetcher } from '@/core/hooks/use-fetcher'
import { DELETE_CLIENTE_MUTATION } from '@/modules/cliente-core/data/cliente'

export const useClienteHandler = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const fetch = useFetcher()

  const removerCliente = useMutation({
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
    removerCliente.mutate(id)
  }
  return {
    handleEditar,
    handleRemover
  }
}
