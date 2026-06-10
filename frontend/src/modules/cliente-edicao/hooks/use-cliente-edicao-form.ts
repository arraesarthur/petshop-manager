import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useClienteEdicaoQuery } from './use-cliente-edicao-query'
import { zodSchema } from '../utils/schema'
import { useClienteEdicaoHandler } from './use-cliente-edicao-handler'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

export const useClienteEdicaoForm = (id: string) => {
  const navigate = useNavigate()
  const { cliente } = useClienteEdicaoQuery(id)
  const { cancelar, remover, salvar } = useClienteEdicaoHandler()
  const initialValues = useMemo(() => {
    return {
      id: cliente?.id ?? '',
      nome: cliente?.nome ?? '',
      telefone: cliente?.telefone ?? '',
      instagram: cliente?.instagram ?? '',
      endereco: cliente?.endereco ?? ''
    }
  }, [cliente])

  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(zodSchema),
    mode: 'onBlur'
  })
  const values = useWatch({ control: form.control })
  useEffect(() => {
    if (cliente) {
      form.reset(initialValues)
    }
  }, [cliente, initialValues, form])

  const submitForm = async data => {
    try {
      await salvar(data)
      navigate('/clientes')
    } catch (error) {
      console.log('Erro ao salvar cliente:', error)
    }
  }

  return {
    form,
    initialValues,
    values,
    submitForm,
    cancelar,
    remover
  }
}
