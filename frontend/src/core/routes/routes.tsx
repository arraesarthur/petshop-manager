import { createBrowserRouter } from 'react-router-dom'
import Login from '../../modules/login/ui/login'
import Home from '../../modules/home/ui/home'
import { PrivateApp } from '../../private-app'

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
  }
])
