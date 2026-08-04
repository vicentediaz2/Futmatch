import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

export function InicioPage() {
  const { user } = useAuth()
  const [canchas, setCanchas] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)
  const [errorTexto, setErrorTexto] = useState<string | null>(null)

  useEffect(() => {
    async function cargarCanchasCercanas() {
      try {
        const { data, error } = await supabase
          .from('cancha')
          .select('*')
          .limit(4)
        
        if (error) {
          console.error('Error cargando canchas:', error)
          setErrorTexto(error.message)
          setCargando(false)
        } else if (data) {
          setCanchas(data)
          setCargando(false)
        }
      } catch (err: any) {
        console.error('Excepción al cargar:', err)
        setErrorTexto(err.message || 'Error desconocido de red')
        setCargando(false)
      }
    }
    cargarCanchasCercanas()
  }, [])

  return (
    <section className="space-y-6">
      {/* Saludo */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">
          Hola, {user?.user_metadata?.alias || 'Jugador'}
        </h1>
        <p className="text-xs text-zinc-500">¿Listo para el partido de hoy?</p>
      </div>

      {/* Canchas cercanas */}
      <div>
        <h2 className="mb-3 text-xs font-bold tracking-wider uppercase text-zinc-400">
          Canchas cercanas a ti
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cargando ? (
            <p className="text-xs text-zinc-500 py-2">Cargando canchas cercanas...</p>
          ) : errorTexto ? (
            <div className="py-2 text-xs">
              <p className="text-red-500 font-bold mb-1">Hubo un error de conexión:</p>
              <p className="text-zinc-500">{errorTexto}</p>
            </div>
          ) : canchas.length > 0 ? (
            canchas.map((cancha) => (
              <div key={cancha.id_cancha || Math.random()} className="rounded-2xl bg-zinc-950 p-5 text-white shadow-sm transition-all hover:bg-zinc-900 sm:p-6">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
                    Cancha Cercana
                  </span>
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                    Disponible
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-bold tracking-tight">{cancha.nombre || 'Cancha sin nombre'}</h3>
                  <p className="mt-1 text-xs text-zinc-400">{cancha.descripción || 'Ubicación no disponible'}</p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-white">-</span>
                    <span className="text-[10px] text-zinc-500">precio / hr</span>
                  </div>
                  <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-zinc-950 transition-transform active:scale-95">
                    Ver cancha
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-2 text-xs">
              <p className="text-orange-500 font-bold mb-1">Conexión exitosa, pero no hay canchas.</p>
              <p className="text-zinc-500">La tabla 'cancha' está vacía o los permisos RLS de Joan no dejan verlas.</p>
            </div>
          )}
        </div>
      </div>

      {/* Accesos rápidos */}
      <div>
        <h2 className="mb-3 text-xs font-bold tracking-wider uppercase text-zinc-400">
          Acciones rápidas
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button className="flex flex-col items-start rounded-xl border border-zinc-200 bg-white p-4 text-left transition-all hover:bg-zinc-50 active:scale-[0.98]">
            <span className="text-sm font-bold text-zinc-900">Crear Partido</span>
            <span className="mt-1 text-[10px] text-zinc-500 leading-normal">Organiza una pichanga con amigos o abre cupos al público</span>
          </button>
          <button className="flex flex-col items-start rounded-xl border border-zinc-200 bg-white p-4 text-left transition-all hover:bg-zinc-50 active:scale-[0.98]">
            <span className="text-sm font-bold text-zinc-900">Unirse a uno</span>
            <span className="mt-1 text-[10px] text-zinc-500 leading-normal">Explora partidos activos que necesitan jugadores</span>
          </button>
        </div>
      </div>

      {/* Actividades sugeridas */}
      <div>
        <h2 className="mb-3 text-xs font-bold tracking-wider uppercase text-zinc-400">
          Partidos cerca tuyo
        </h2>
        <div className="grid gap-x-8 divide-y divide-zinc-100 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3">
          {[
            { id: 1, type: 'Fútbol 5', time: 'Mañana, 19:30', place: 'Complejo San Luis', status: '2 cupos libres' },
            { id: 2, type: 'Fútbol 11', time: 'Dom, 10:00', place: 'Estadio Municipal', status: 'Completo' },
            { id: 3, type: 'Fútbol 7', time: 'Lun, 20:00', place: 'Cancha 3 Las Condes', status: '5 cupos libres' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <div>
                <h4 className="text-xs font-bold text-zinc-900">{item.type} • {item.place}</h4>
                <p className="mt-0.5 text-[10px] text-zinc-400">{item.time}</p>
              </div>
              <span className={`text-[10px] font-semibold ${item.status === 'Completo' ? 'text-zinc-400' : 'text-zinc-900'}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>


    </section>
  )
}
