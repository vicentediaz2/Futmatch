import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export function PerfilPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [perfil, setPerfil] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [newPosicion, setNewPosicion] = useState('')

  useEffect(() => {
    async function cargarPerfil() {
      if (!user) return
      
      const { data, error } = await supabase
        .from('perfil')
        .select('*')
        .eq('id_usuario', user.id)
        .single()
        
      if (!error && data) {
        setPerfil(data)
        setNewPosicion(data.posicion || '')
      }
      setLoading(false)
    }
    
    cargarPerfil()
  }, [user])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  const handleSavePosicion = async () => {
    if (!user) return
    const { error } = await supabase
      .from('perfil')
      .update({ posicion: newPosicion })
      .eq('id_usuario', user.id)
      
    if (!error) {
      setPerfil({ ...perfil, posicion: newPosicion })
      setIsEditing(false)
    }
  }

  const menuItems = [
    { label: 'Editar Perfil', desc: 'Información personal y contacto', action: () => setIsEditing(!isEditing) },
    { label: 'Mis Estadísticas', desc: 'Historial detallado y rendimiento', action: () => {} },
    { label: 'Canchas Favoritas', desc: 'Tus complejos deportivos guardados', action: () => {} },
    { label: 'Preferencias de Juego', desc: 'Posición, horarios y nivel', action: () => {} },
    { label: 'Configuración', desc: 'Notificaciones y seguridad', action: () => {} },
  ]

  if (loading) {
    return <div className="py-12 text-center text-xs text-zinc-500">Cargando perfil...</div>
  }

  return (
    <section className="space-y-6">
      {/* Cabecera de Perfil */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xl font-black text-white uppercase">
          {user?.user_metadata?.alias?.charAt(0) || 'J'}
        </div>
        <div>
          <h2 className="text-base font-bold text-zinc-900">{user?.user_metadata?.alias || 'Jugador Sin Alias'}</h2>
          <p className="text-xs text-zinc-500">
            {perfil?.posicion || 'Sin definir'} • Nivel {perfil?.nivel || 1}
          </p>
          <span className="mt-1.5 inline-block rounded bg-zinc-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-800">
            Miembro de la comunidad
          </span>
        </div>
      </div>

      {isEditing && (
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">
            Editar Posición
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newPosicion}
              onChange={(e) => setNewPosicion(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-sm outline-none focus:border-zinc-950"
              placeholder="Ej: Delantero, Portero..."
            />
            <button 
              onClick={handleSavePosicion}
              className="rounded-lg bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition-all active:scale-95"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-3 divide-x divide-zinc-100 rounded-xl border border-zinc-100 bg-white py-4 text-center sm:max-w-2xl">
        <div>
          <p className="text-lg font-black text-zinc-900">{perfil?.partidosjugados || 0}</p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Partidos</p>
        </div>
        <div>
          <p className="text-lg font-black text-zinc-900">{perfil?.partidosganados || 0}</p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Victorias</p>
        </div>
        <div>
          <p className="text-lg font-black text-zinc-900">{perfil?.racha || 0}</p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Racha</p>
        </div>
      </div>

      {/* Menú de opciones */}
      <div>
        <h3 className="mb-3 text-xs font-bold tracking-wider uppercase text-zinc-400">
          Ajustes de cuenta
        </h3>
        <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-100 bg-white px-4 lg:grid lg:grid-cols-2 lg:divide-x lg:divide-y-0">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="flex w-full items-center justify-between py-4 text-left group"
            >
              <div>
                <h4 className="text-xs font-bold text-zinc-900 group-hover:text-zinc-950 transition-colors">
                  {item.label}
                </h4>
                <p className="mt-0.5 text-[10px] text-zinc-400">{item.desc}</p>
              </div>
              <svg
                className="h-4 w-4 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Botón de cerrar sesión */}
      <button 
        onClick={handleSignOut}
        className="w-full rounded-xl border border-zinc-200 py-3 text-xs font-bold uppercase tracking-wider text-red-600 transition-all hover:bg-red-50 active:scale-[0.99]"
      >
        Cerrar Sesión
      </button>
    </section>
  )
}
