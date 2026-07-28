import { useState } from 'react'

export function PartidosPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const upcomingMatches = [
    {
      id: 1,
      type: 'Fútbol 7',
      venue: 'Cancha El Templo',
      date: 'Hoy, 21:00',
      price: '$4.500 /jugador',
      players: '11/14',
      organizer: 'Tú',
    },
    {
      id: 2,
      type: 'Fútbol 5',
      venue: 'Complejo San Luis',
      date: 'Mañana, 19:30',
      price: '$3.500 /jugador',
      players: '8/10',
      organizer: 'Benjamín V.',
    },
  ]

  const pastMatches = [
    {
      id: 3,
      type: 'Fútbol 7',
      venue: 'Club Oriente',
      date: '18 Jul, 20:00',
      result: 'Ganado (5 - 3)',
      score: '10/10 Fair Play',
    },
    {
      id: 4,
      type: 'Fútbol 11',
      venue: 'Estadio Municipal',
      date: '10 Jul, 09:00',
      result: 'Jugado',
      score: '9/10 Fair Play',
    },
  ]

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">Mis Partidos</h1>
        <p className="text-xs text-zinc-500">Historial y próximos encuentros</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-100">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'upcoming'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-400 hover:text-zinc-600'
          }`}
        >
          Próximos
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 pb-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'past'
              ? 'border-zinc-950 text-zinc-950'
              : 'border-transparent text-zinc-400 hover:text-zinc-600'
          }`}
        >
          Pasados
        </button>
      </div>

      {/* Lista de partidos */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activeTab === 'upcoming' ? (
          upcomingMatches.length > 0 ? (
            upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="group relative rounded-xl border border-zinc-100 bg-white p-4 transition-all hover:border-zinc-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    {match.type} • Organiza {match.organizer}
                  </span>
                  <span className="text-[10px] font-semibold text-zinc-900">
                    {match.price}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-bold text-zinc-900 group-hover:text-zinc-950">
                  {match.venue}
                </h3>
                <p className="mt-0.5 text-xs text-zinc-500">{match.date}</p>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-3">
                  <span className="text-xs text-zinc-600">
                    Confirmados: <strong className="text-zinc-900">{match.players}</strong>
                  </span>
                  <button className="text-[10px] font-bold uppercase tracking-wider text-zinc-900 underline underline-offset-4 hover:text-zinc-600">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-xs text-zinc-400">No tienes partidos programados</p>
          )
        ) : pastMatches.length > 0 ? (
          pastMatches.map((match) => (
            <div
              key={match.id}
              className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                  {match.type}
                </span>
                <span className="text-[10px] font-medium text-zinc-400">{match.date}</span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-zinc-700">{match.venue}</h3>
              <div className="mt-3 flex items-center justify-between border-t border-zinc-100/50 pt-2.5">
                <span className="text-xs font-semibold text-zinc-900">{match.result}</span>
                <span className="text-[10px] text-zinc-400">{match.score}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-8 text-xs text-zinc-400">No hay partidos anteriores</p>
        )}
      </div>
    </section>
  )
}
