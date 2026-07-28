import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { BottomNav } from './BottomNav'

export function AppLayout() {
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
