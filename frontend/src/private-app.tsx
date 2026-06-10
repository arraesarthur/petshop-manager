import { Navigate } from 'react-router-dom'
import { AuthContext } from './core/context/auth-context'
import { useContext } from 'react'
import { Header } from './core/components/header'

export const PrivateApp = ({ children }) => {
  const auth = useContext(AuthContext)

  if (!auth?.token) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Header />
      {children}
    </>
  )
}
