import { Navigate } from 'react-router-dom'
import { AuthContext, AuthProvider } from './core/context/auth-context'
import { useContext } from 'react'

export const PrivateApp = ({ children }) => {
 const { token } = useContext(AuthContext)

  if (!token) {
    return <Navigate to='/login' replace />
  }

  return <AuthProvider>{children}</AuthProvider>
}
