import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { path as inicioPath, route as inicioRoute } from './inicio'
import { route as partidosRoute } from './partidos'
import { route as explorarRoute } from './explorar'
import { route as perfilRoute } from './perfil'

import { LoginPage } from './login/Page'
import { RegistroPage } from './registro/Page'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registro',
    element: <RegistroPage />,
  },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to={inicioPath} replace /> },
      inicioRoute,
      partidosRoute,
      explorarRoute,
      perfilRoute,
    ],
  },
])
