import type { RouteObject } from 'react-router-dom'
import { PerfilPage } from './Page'

export const path = '/perfil' as const

export const route: RouteObject = {
  path,
  element: <PerfilPage />,
}
