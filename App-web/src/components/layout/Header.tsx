import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../routes/paths'
import { navIconClass } from './nav-icon'

export function Header() {
  return (
    <header className="fixed top-0 left-1/2 z-50 flex h-14 w-full max-w-[480px] -translate-x-1/2 items-center justify-between border-b border-zinc-100 bg-white/90 backdrop-blur-md px-4">
      <span className="text-xs font-black tracking-[0.2em] uppercase text-zinc-900">
        Futmatch
      </span>
      <NavLink
        to={ROUTES.profile}
        className={({ isActive }) =>
          [
            'flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium no-underline transition-all',
            isActive
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950',
          ].join(' ')
        }
        aria-label="Ir al perfil"
      >
        <svg
          className={navIconClass}
          viewBox="0 0 24 24"
          aria-hidden="true"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
        Perfil
      </NavLink>
    </header>
  )
}
