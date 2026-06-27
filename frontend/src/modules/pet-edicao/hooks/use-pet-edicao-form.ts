import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePetEdicaoQuery } from './use-pet-edicao-query'
import { usePetEdicaoHandler } from './use-pet-edicao-handler'
import { useRacasQuery } from './use-racas-query'
import { zodSchema } from '../utils/schema'

export const usePetEdicaoForm = (id: string) => {
  const navigate = useNavigate()
  const { pet } = usePetEdicaoQuery(id)
  const { cancelar, remover, salvar } = usePetEdicaoHandler()
  const initialValues = useMemo(() => {
    return {
      id: pet?.id ?? '',
      nome: pet?.nome ?? '',
      especie: pet?.especie ?? '',
      racaId: pet?.raca?.id ?? '',
      sexo: pet?.sexo ?? '',
      porte: pet?.porte ?? '',
      clienteId: pet?.cliente?.id ?? '',
      observacao: pet?.observacao ?? '',
      dataNascimento: pet?.dataNascimento ?? ''
    }
  }, [pet])
  
  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(zodSchema),
    mode: 'onBlur'
  })
  
  
  const values = useWatch({ control: form.control })
  const especieSelecionada = values.especie
  const { racas, loading: loadingRacas } = useRacasQuery(especieSelecionada)
  
  
  useEffect(() => {
    if (pet) {
      form.reset(initialValues)
    }
  }, [pet, initialValues, form])
  
  const submitForm = async (data) => {
    try {
      await salvar(data)
      navigate('/pets')
    } catch (error) {
      console.error('Erro ao salvar pet:', error)
    }
  }

  return {
    form,
    initialValues,
    values,
    racas,
    loadingRacas,
    submitForm,
    cancelar,
    remover
  }
}