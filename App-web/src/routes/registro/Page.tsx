import { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export function RegistroPage() {
  const [email, setEmail] = useState('')
  const [alias, setAlias] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()

  if (authLoading) return null
  if (user) return <Navigate to="/inicio" replace />

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg(null)

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    if (!alias.trim()) {
      setErrorMsg('Por favor ingresa un alias')
      setLoading(false)
      return
    }

    // 1. Crear usuario en Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          alias: alias.trim()
        }
      }
    })

    if (authError) {
      setErrorMsg(authError.message)
      setLoading(false)
      return
    }

    // 2. Si se creó, insertar en la tabla perfil.
    if (authData.user) {
      const { error: profileError } = await supabase.from('perfil').insert({
        id_usuario: authData.user.id,
        nivel: 1, 
        experiencia: 0,
        racha: 0,
        partidosjugados: 0,
        partidosganados: 0,
        posicion: 'Sin definir'
      })

      if (profileError) {
        console.error('Error al crear perfil:', profileError)
      }
    }

    // 3. Revisar si requiere confirmación de correo
    if (authData.user && !authData.session) {
      setSuccessMsg('¡Cuenta creada! Por favor, revisa tu bandeja de entrada (y la carpeta de spam) para confirmar tu correo antes de iniciar sesión.')
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
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Crea tu cuenta</h1>
          <p className="mt-1 text-sm text-zinc-500">Únete a la mejor comunidad de fútbol</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Nombre de Usuario
            </label>
            <input
              type="text"
              required
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none transition-all focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950"
              placeholder="Ej: Maradona"
            />
          </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none transition-all focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-900 outline-none transition-all focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950"
              placeholder="Repite tu contraseña"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
          )}

          {successMsg && (
            <div className="rounded-xl bg-green-50 p-4 border border-green-100">
              <p className="text-sm text-green-700 font-medium">{successMsg}</p>
              <Link to="/login" className="mt-2 inline-block text-xs font-bold text-green-800 hover:underline">
                Ir a Iniciar Sesión →
              </Link>
            </div>
          )}

          {!successMsg && (
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-zinc-950 py-3.5 text-sm font-bold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </button>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-zinc-500">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-bold text-zinc-900 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
