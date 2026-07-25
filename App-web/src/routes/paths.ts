import { path as home } from './inicio'
import { path as matches } from './partidos'
import { path as explore } from './explorar'
import { path as profile } from './perfil'

export const ROUTES = {
  home,
  matches,
  explore,
  profile,
} as const

export type TabRoute = typeof ROUTES.home | typeof ROUTES.matches | typeof ROUTES.explore
