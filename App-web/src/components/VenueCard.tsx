export type VenueCardProps = {
  typeLabel: string
  name: string
  address: string
  rating: string
  price: string
  available: string
}

export function VenueCard({
  typeLabel,
  name,
  address,
  rating,
  price,
  available,
}: VenueCardProps) {
  return (
    <div className="group rounded-xl border border-zinc-150 bg-white p-4 transition-all hover:border-zinc-200">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
            {typeLabel}
          </span>
          <h3 className="mt-1 text-sm font-bold text-zinc-900 group-hover:text-zinc-950">
            {name}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500">{address}</p>
        </div>
        <span className="flex items-center gap-0.5 rounded bg-zinc-50 px-1.5 py-0.5 text-[10px] font-bold text-zinc-800">
          ★ {rating}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-50 pt-3">
        <div>
          <p className="text-[9px] uppercase tracking-wider text-zinc-400">Precio promedio</p>
          <p className="text-xs font-bold text-zinc-900">{price}</p>
        </div>
        <span className="rounded-md bg-zinc-50 px-2 py-1 text-[10px] font-semibold text-zinc-500">
          {available}
        </span>
      </div>
    </div>
  )
}
