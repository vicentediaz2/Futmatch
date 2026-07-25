import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { BottomNav } from './BottomNav'

export function AppLayout() {
  return (
    <div className="mx-auto flex min-h-svh max-w-[480px] flex-col bg-white border-x border-zinc-200/80">
      <Header />
      <main className="flex-1 overflow-y-auto px-4 pt-[calc(3.5rem+1rem)] pb-[calc(4rem+1rem)]">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
