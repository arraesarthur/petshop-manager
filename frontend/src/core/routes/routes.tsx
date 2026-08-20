import { createBrowserRouter } from 'react-router-dom'
import Login from '../../modules/login/ui/login'
import Home from '../../modules/home/ui/home'
import { PrivateApp } from '../../private-app'
import { ClienteListagem } from '@/modules/cliente-listagem/ui/cliente-listagem'
import { ClienteEdicao } from '@/modules/cliente-edicao/ui/cliente-edicao'
import { PetListagem } from '@/modules/pet-listagem/ui/pet-listagem'
import PetEdicao from '@/modules/pet-edicao/ui/pet-edicao'
import { ServicoListagem } from '@/modules/servico-listagem/ui/servico-listagem'
import { ServicoEdicao } from '@/modules/servico-edicao/ui/servico-edicao'

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
  },
  {
    path: '/pets',
    element: (
      <PrivateApp>
        <PetListagem />
      </PrivateApp>
    )
  },
  {
    path: '/editar/pets/:id',
    element: (
      <PrivateApp>
        <PetEdicao />
      </PrivateApp>
    )
  },
  {
    path: '/pets/novo',
    element: (
      <PrivateApp>
        <PetEdicao />
      </PrivateApp>
    )
  },
  {
    path: '/servicos',
    element: (
      <PrivateApp>
        <ServicoListagem />
      </PrivateApp>
    )
  },
  {
    path: '/editar/servicos/:id',
    element: (
      <PrivateApp>
        <ServicoEdicao />
      </PrivateApp>
    )
  },
  {
    path: '/servicos/novo',
    element: (
      <PrivateApp>
        <ServicoEdicao />
      </PrivateApp>
    )
  }
])
