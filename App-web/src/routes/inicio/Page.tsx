export function InicioPage() {
  return (
    <section className="space-y-6">
      {/* Saludo */}
      <div className="flex flex-col gap-0.5">
        <h1 className="text-xl font-bold tracking-tight text-zinc-900">Hola, Vicente</h1>
        <p className="text-xs text-zinc-500">¿Listo para el partido de hoy?</p>
      </div>

      {/* Tarjeta de Próximo Partido */}
      <div className="rounded-2xl bg-zinc-950 p-5 text-white shadow-sm transition-all hover:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400">
            Siguiente Partido
          </span>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
            Hoy 21:00
          </span>
        </div>
        <div className="mt-4">
          <h3 className="text-base font-bold tracking-tight">Fútbol 7 - Cancha El Templo</h3>
          <p className="mt-1 text-xs text-zinc-400">Avenida Departamental 1450, Santiago</p>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-white">11/14</span>
            <span className="text-[10px] text-zinc-500">jugadores confirmados</span>
          </div>
          <button className="rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-zinc-950 transition-transform active:scale-95">
            Ver partido
          </button>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div>
        <h2 className="mb-3 text-xs font-bold tracking-wider uppercase text-zinc-400">
          Acciones rápidas
        </h2>
        <div className="grid grid-cols-2 gap-3">
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
        <div className="divide-y divide-zinc-100">
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
