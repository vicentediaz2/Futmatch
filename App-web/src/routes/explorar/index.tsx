import type { RouteObject } from 'react-router-dom'
import { ExplorarPage } from './Page'

export const path = '/explorar' as const

export const route: RouteObject = {
  path,
  element: <ExplorarPage />,
}
