import { Outlet, Navigate } from 'react-router-dom'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { useAuth } from '../../contexts/AuthContext'

export function AppLayout() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex min-h-svh w-full flex-col bg-white">
      <Header />
      <main className="flex-1 px-4 pb-24 pt-20 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto w-full">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
