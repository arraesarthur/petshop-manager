import { createContext, useState, type ReactNode } from 'react'

type AuthContextType = {
  token: string | null
  login: (token: string, nome: string, email: string, expiresIn: number) => void
  usuarioLogado: {
    nome: string | null
    email: string | null
  }
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  )
  const [usuarioLogado, setUsuariologado] = useState({
    nome: localStorage.getItem('nome'),
    email: localStorage.getItem('email')
  })

  function login(
    token: string,
    nome: string,
    email: string,
    expiresIn: number
  ) {
    const expiresAt = Date.now() + expiresIn * 1000
    localStorage.setItem('token', token)
    localStorage.setItem('nome', nome)
    localStorage.setItem('email', email)
    localStorage.setItem('expiresAt', String(expiresAt))
    setToken(token)
    setUsuariologado({ nome, email })
  }

  function logout() {
    localStorage.clear()
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, usuarioLogado }}>
      {children}
    </AuthContext.Provider>
  )
}
