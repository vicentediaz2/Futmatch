import { useEffect, useState } from 'react'
import { VenueCard } from '../../components/VenueCard'
import { supabase } from '../../lib/supabase'

export function ExplorarPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'f5' | 'f7' | 'f11'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [canchas, setCanchas] = useState<any[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    async function cargarCanchas() {
      try {
        const { data, error } = await supabase.from('cancha').select('*')
        if (error) {
          console.error('Error cargando canchas:', error)
        } else if (data) {
          setCanchas(data)
        }
      } catch (err) {
        console.error('Excepción al cargar:', err)
      } finally {
        setCargando(false)
      }
    }
    cargarCanchas()
  }, [])

  const filteredVenues = canchas.filter((cancha) => {
    // Como la base de datos aún no tiene una columna de 'tipo de fútbol', el filtro de tipo solo mostrará resultados si está en 'Todos'.
    const matchesFilter = selectedFilter === 'all' 
    
    const nombreStr = cancha.nombre ? cancha.nombre.toLowerCase() : ''
    const descStr = cancha.descripción ? cancha.descripción.toLowerCase() : ''
    const busquedaStr = searchQuery.toLowerCase()

    const matchesSearch = nombreStr.includes(busquedaStr) || descStr.includes(busquedaStr)
    return matchesFilter && matchesSearch
  })

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">Explorar Canchas</h1>
        <p className="text-xs text-zinc-500">Encuentra complejos deportivos cerca</p>
      </div>

      {/* Input de búsqueda */}
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por nombre o descripción..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-zinc-200 bg-white py-3 pr-4 pl-10 text-xs text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
        />
        <svg
          className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {/* Filtros */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'Todos' },
          { id: 'f5', label: 'Fútbol 5' },
          { id: 'f7', label: 'Fútbol 7' },
          { id: 'f11', label: 'Fútbol 11' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id as any)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
              selectedFilter === filter.id
                ? 'bg-zinc-950 text-white'
                : 'border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid de centros */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cargando ? (
          <p className="text-center py-12 text-xs text-zinc-400 col-span-full">Cargando canchas desde Supabase...</p>
        ) : filteredVenues.length > 0 ? (
          filteredVenues.map((cancha) => (
            <VenueCard
              key={cancha.id_cancha || Math.random()}
              typeLabel={'Fútbol'}
              name={cancha.nombre || 'Cancha sin nombre'}
              address={cancha.descripción || 'Sin descripción'}
              rating={'5.0'}
              price={`$0 /hr`}
              available={'Disponible'}
            />
          ))
        ) : (
          <p className="text-center py-12 text-xs text-zinc-400 col-span-full">No se encontraron complejos deportivos</p>
        )}
      </div>
    </section>
  )
}
