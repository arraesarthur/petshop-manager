import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useServicoEdicaoQuery } from './use-servico-edicao-query'
import { useServicoEdicaoHandler } from './use-servico-edicao-handler'
import { zodSchema } from '../utils/schema'

type ServicoFormInput = z.input<typeof zodSchema>
type ServicoFormValues = z.output<typeof zodSchema>

export const useServicoEdicaoForm = (id: string) => {
  const navigate = useNavigate()
  const { servico } = useServicoEdicaoQuery(id)
  const { cancelar, remover, salvar } = useServicoEdicaoHandler()

  const initialValues = useMemo(() => {
    return {
      id: servico?.id ?? '',
      nome: servico?.nome ?? '',
      descricao: servico?.descricao ?? '',
      precoPequeno: servico?.precoPequeno ?? 0,
      precoMedio: servico?.precoMedio ?? 0,
      precoGrande: servico?.precoGrande ?? 0
    }
  }, [servico])

  const form = useForm<ServicoFormInput, any, ServicoFormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(zodSchema),
    mode: 'onBlur'
  })

  const values = useWatch({ control: form.control })

  useEffect(() => {
    if (servico) {
      form.reset(initialValues)
    }
  }, [servico, initialValues, form])

  const submitForm = async data => {
    try {
      await salvar(data)
      navigate('/servicos')
    } catch (error) {
      console.error('Erro ao salvar serviço:', error)
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
