import { FormProvider } from 'react-hook-form'
import { FormInput } from '@/core/components/form-input'
import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { useLoginForm } from '../hooks/use-login-form'
import { useGoogleLogin, type TokenResponse } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { authService } from '../utils/auth-service'
import { FormInputPassword } from '@/core/components/form-input-password'

export const Login = () => {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const isLogin = mode === 'login'

  const { form, submitForm } = useLoginForm(mode)

  const {
    handleSubmit,
    formState: { isDirty }
  } = form

  const handleGoogleSuccess = async (tokenResponse: TokenResponse) => {
    try {
      const data = await authService.googleLogin(tokenResponse.access_token)
      login(data.accessToken)
      navigate('/')
    } catch (error) {
      console.error('Google login error:', error)
    }
  }

  const handleGoogleError = () => {
    console.error('Google login failed')
  }

  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: 'implicit',
    scope: 'openid profile email'
  })
  return (
    <div className='grid md:grid-cols-[55%_45%] grid-cols-1 min-h-screen overflow-hidden'>
      <div className='hidden md:block h-screen'>
        <img src='bath.jfif' className='w-full h-full object-cover' />
      </div>
      <div className='w-full flex items-center text-center justify-center p-6'>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(submitForm)}
            className='flex flex-col gap-3 items-center w-[80%]'
          >
            <p className='mx-auto text-3xl font-bold'>
              {isLogin ? 'Fazer Login' : 'Fazer Cadastro'}
            </p>
            <p className='text-muted-foreground text-sm m-0'>
              {`Digite suas informações abaixo para fazer ${
                isLogin ? 'login' : 'registro'
              } em sua conta.`}
            </p>
            {mode === 'register' ? (
              <FormInput name='nomeCompleto' label='Nome Completo' />
            ) : null}
            <FormInput name='email' label='E-mail' />
            <FormInputPassword name='senha' label='Senha' />
            <Button
              type='submit'
              disabled={!isDirty}
              className='w-full mt-4 rounded-sm bg-blue-400'
            >
              {isLogin ? 'Entrar' : 'Registrar'}
            </Button>

            <div className='flex items-center gap-3 w-full mt-3'>
              <div className='h-px flex-1 bg-gray-300' />

              <p className='text-xs text-gray-500'>OU</p>

              <div className='h-px flex-1 bg-gray-300' />
            </div>

            <Button
              type='button'
              onClick={() => googleLogin()}
              className='w-full bg-background text-black border border-gray-300 rounded-md mt-4 hover:bg-gray-200 py-5'
            >
              <img src='google-icon.svg' width={15} />
              <p>Continue com Google</p>
            </Button>

            <div className='text-center flex-none text-sm text-gray-500 mt-2'>
              {isLogin ? (
                <>
                  Não tem uma conta?{' '}
                  <button
                    type='button'
                    onClick={() => setMode('register')}
                    className='text-blue-600'
                  >
                    Registrar
                  </button>
                </>
              ) : (
                <>
                  Já tem uma conta?{' '}
                  <button
                    type='button'
                    onClick={() => setMode('login')}
                    className='text-blue-400'
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Login
