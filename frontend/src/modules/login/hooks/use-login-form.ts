import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from 'react'
import { loginSchema, registerSchema } from '../utils/schema'
import { useNavigate } from 'react-router-dom'
import { api } from '@/core/utils/axios'
import { AuthContext } from '@/core/context/auth-context'
import { toast } from 'sonner'

export const useLoginForm = mode => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const initialLoginValues = {
    email: '',
    senha: ''
  }

  const initialRegisterValues = {
    nomeCompleto: '',
    email: '',
    senha: ''
  }

  const form = useForm({
    defaultValues:
      mode === 'login' ? initialLoginValues : initialRegisterValues,
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    mode: 'onBlur'
  })

  const { reset } = form

  useEffect(() => {
    reset(mode === 'login' ? initialLoginValues : initialRegisterValues)
  }, [mode, reset])

  const submitForm = async data => {
    try {
      const response =
        mode === 'login'
          ? await api.post('/login', data)
          : await api.post('/register', data)

      login(
        response.data.accessToken,
        response.data.nomeCompleto,
        response.data.email,
        response.data.expiresIn
      )

      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login')
    }
  }

  return { form, submitForm }
}
