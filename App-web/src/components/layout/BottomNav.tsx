import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ROUTES, type TabRoute } from '../../routes/paths'
import { navIconClass } from './nav-icon'

const tabs: { path: TabRoute; label: string; icon: ReactNode }[] = [
  {
    path: ROUTES.home,
    label: 'Inicio',
    icon: (
      <svg
        className={navIconClass}
        viewBox="0 0 24 24"
        aria-hidden="true"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
      </svg>
    ),
  },
  {
    path: ROUTES.matches,
    label: 'Partidos',
    icon: (
      <svg
        className={navIconClass}
        viewBox="0 0 24 24"
        aria-hidden="true"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M3 12h18" />
      </svg>
    ),
  },
  {
    path: ROUTES.explore,
    label: 'Explorar',
    icon: (
      <svg
        className={navIconClass}
        viewBox="0 0 24 24"
        aria-hidden="true"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4.5 4.5" />
      </svg>
    ),
  },
]

export function BottomNav() {
  const { pathname } = useLocation()
  const isProfileActive = pathname === ROUTES.profile

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 flex h-16 w-full max-w-[480px] -translate-x-1/2 items-stretch border-t border-zinc-100 bg-white/95 backdrop-blur-md"
      aria-label="Navegación principal"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            [
              'flex flex-1 flex-col items-center justify-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold no-underline transition-all',
              isActive && !isProfileActive
                ? 'text-zinc-950 scale-105'
                : 'text-zinc-400 hover:text-zinc-900',
            ].join(' ')
          }
          aria-label={tab.label}
        >
          {tab.icon}
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
