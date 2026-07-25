import type { RouteObject } from 'react-router-dom'
import { InicioPage } from './Page'

export const path = '/inicio' as const

export const route: RouteObject = {
  path,
  element: <InicioPage />,
}
