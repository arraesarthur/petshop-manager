import { createBrowserRouter } from 'react-router-dom'
import Login from '../../modules/login/ui/login'
import Home from '../../modules/home/ui/home'
import { PrivateApp } from '../../private-app'
import { ClienteListagem } from '@/modules/cliente-listagem/ui/cliente-listagem'
import { ClienteEdicao } from '@/modules/cliente-edicao/ui/cliente-edicao'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: (
      <PrivateApp>
        <Home />
      </PrivateApp>
    )
  },
  {
    path: '/clientes',
    element: (
      <PrivateApp>
        <ClienteListagem />
      </PrivateApp>
    )
  },
  {
    path: '/editar/clientes/:id',
    element: (
      <PrivateApp>
        <ClienteEdicao />
      </PrivateApp>
    )
  },
  {
    path: '/clientes/novo',
    element: (
      <PrivateApp>
        <ClienteEdicao />
      </PrivateApp>
    )
  }
])
