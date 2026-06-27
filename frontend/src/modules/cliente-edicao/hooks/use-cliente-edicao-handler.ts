import { useFetcher } from '@/core/hooks/use-fetcher'
import { DELETE_CLIENTE_MUTATION } from '@/modules/cliente-core/data/cliente'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { SALVAR_CLIENTE_MUTATION } from '../data/cliente'
import { toast } from 'sonner'

type salvarClienteInput = {
  id?: string
  nome: string
  telefone: string
  instagram: string
  endereco: string
}

export const useClienteEdicaoHandler = () => {
  const navigate = useNavigate()
  const fetch = useFetcher()
  const queryClient = useQueryClient()

  const removerCliente = useMutation({
    mutationKey: ['cliente-remocao-mutation'],
    mutationFn: (id: string) => {
      return fetch(DELETE_CLIENTE_MUTATION, {
        id
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clientes-paged-query'],
        refetchType: 'all'
      })
    }
  })

  const salvarCliente = useMutation({
    mutationKey: ['cliente-salvar-mutation'],
    mutationFn: (input: salvarClienteInput) => {
      return fetch(SALVAR_CLIENTE_MUTATION, {
        filterInput: input
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['clientes-paged-query'],
        refetchType: 'all'
      })
    }
  })

  const cancelar = () => {
    navigate('/clientes')
  }
  const remover = (id: string) => {
    removerCliente.mutate(id, {
      onSuccess: () => {
        toast.success('Cliente removido com sucesso')
        navigate('/clientes')
      },
      onError: error => {
        toast.error('Erro: ' + error?.response?.errors?.[0]?.message)
      }
    })
  }
  const salvar = async (input: salvarClienteInput) => {
    try {
      const cliente = await salvarCliente.mutateAsync(input)
      toast.success(`Cliente ${cliente.salvarCliente.nome} salvo com sucesso`)
      navigate('/clientes')
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
