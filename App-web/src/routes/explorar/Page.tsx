import { useState } from 'react'

export function ExplorarPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'f5' | 'f7' | 'f11'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const venues = [
    {
      id: 1,
      name: 'Cancha El Templo',
      type: 'f7',
      typeLabel: 'Fútbol 7 & 9',
      address: 'Avenida Departamental 1450, Santiago',
      rating: '4.8',
      price: '$45.000 /hr',
      available: 'Hoy disponible',
    },
    {
      id: 2,
      name: 'Complejo San Luis',
      type: 'f5',
      typeLabel: 'Fútbol 5',
      address: 'Calle San Luis 230, Las Condes',
      rating: '4.5',
      price: '$35.000 /hr',
      available: 'Hoy disponible',
    },
    {
      id: 3,
      name: 'Estadio Municipal Peñalolén',
      type: 'f11',
      typeLabel: 'Fútbol 11',
      address: 'Valenzuela Llanos 8500, Peñalolén',
      rating: '4.9',
      price: '$60.000 /hr',
      available: 'Solo fin de semana',
    },
  ]

  const filteredVenues = venues.filter((venue) => {
    const matchesFilter = selectedFilter === 'all' || venue.type === selectedFilter
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder="Buscar por nombre o comuna..."
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
      <div className="space-y-4">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="group rounded-xl border border-zinc-150 bg-white p-4 transition-all hover:border-zinc-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
                    {venue.typeLabel}
                  </span>
                  <h3 className="mt-1 text-sm font-bold text-zinc-900 group-hover:text-zinc-950">
                    {venue.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-500">{venue.address}</p>
                </div>
                <span className="flex items-center gap-0.5 rounded bg-zinc-50 px-1.5 py-0.5 text-[10px] font-bold text-zinc-800">
                  ★ {venue.rating}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-zinc-400">Precio promedio</p>
                  <p className="text-xs font-bold text-zinc-900">{venue.price}</p>
                </div>
                <span className="text-[10px] font-semibold text-zinc-500 bg-zinc-50 px-2 py-1 rounded-md">
                  {venue.available}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-12 text-xs text-zinc-400">No se encontraron complejos deportivos</p>
        )}
      </div>
    </section>
  )
}
