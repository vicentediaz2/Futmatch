import { NavLink } from 'react-router-dom'
import { ROUTES } from '../../routes/paths'
import { navIconClass } from './nav-icon'

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 w-full items-center justify-between border-b border-zinc-100 bg-white/90 px-4 backdrop-blur-md sm:px-6 md:px-8 lg:px-10">
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
