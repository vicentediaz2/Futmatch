export function PerfilPage() {
  const menuItems = [
    { label: 'Editar Perfil', desc: 'Información personal y contacto' },
    { label: 'Mis Estadísticas', desc: 'Historial detallado y rendimiento' },
    { label: 'Canchas Favoritas', desc: 'Tus complejos deportivos guardados' },
    { label: 'Preferencias de Juego', desc: 'Posición, horarios y nivel' },
    { label: 'Configuración', desc: 'Notificaciones y seguridad' },
  ]

  return (
    <section className="space-y-6">
      {/* Cabecera de Perfil */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xl font-black text-white">
          VD
        </div>
        <div>
          <h2 className="text-base font-bold text-zinc-900">Vicente Díaz</h2>
          <p className="text-xs text-zinc-500">Delantero • Nivel Intermedio</p>
          <span className="mt-1.5 inline-block rounded bg-zinc-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-zinc-800">
            Miembro desde 2025
          </span>
        </div>
      </div>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-3 divide-x divide-zinc-100 rounded-xl border border-zinc-100 bg-white py-4 text-center">
        <div>
          <p className="text-lg font-black text-zinc-900">42</p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Partidos</p>
        </div>
        <div>
          <p className="text-lg font-black text-zinc-900">28</p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Goles</p>
        </div>
        <div>
          <p className="text-lg font-black text-zinc-900">9.8</p>
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Fair Play</p>
        </div>
      </div>

      {/* Menú de opciones */}
      <div>
        <h3 className="mb-3 text-xs font-bold tracking-wider uppercase text-zinc-400">
          Ajustes de cuenta
        </h3>
        <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-100 bg-white px-4">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
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
      <button className="w-full rounded-xl border border-zinc-200 py-3 text-xs font-bold uppercase tracking-wider text-zinc-700 transition-all hover:bg-zinc-50 active:scale-[0.99]">
        Cerrar Sesión
      </button>
    </section>
  )
}
