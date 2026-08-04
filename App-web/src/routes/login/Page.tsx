import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()

  if (authLoading) return null
  if (user) return <Navigate to="/inicio" replace />

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setErrorMsg(error.message)
      setLoading(false)
    } else {
      navigate('/inicio')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-zinc-100">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 text-white font-black text-xl mb-4">
            F
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Bienvenido de vuelta</h1>
          <p className="mt-1 text-sm text-zinc-500">Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none transition-all focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none transition-all focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-zinc-950 py-3.5 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="font-bold text-zinc-900 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  )
}
