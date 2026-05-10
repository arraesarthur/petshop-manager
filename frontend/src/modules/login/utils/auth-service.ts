import { api } from '@/core/utils/axios'

export const authService = {
  googleLogin: async (token: string) => {
  const response = await api.post(
    '/google',
    { token },
    {
      headers: {
        Authorization: undefined
      }
    }
  )

  return response.data
}
}
