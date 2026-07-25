import type { RouteObject } from 'react-router-dom'
import { PartidosPage } from './Page'

export const path = '/partidos' as const

export const route: RouteObject = {
  path,
  element: <PartidosPage />,
}
