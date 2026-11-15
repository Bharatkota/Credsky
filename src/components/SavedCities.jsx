import { Star, X } from 'lucide-react'

// Saved cities + recent searches (FR-07 and PRD "Saved locations" screen component).

export default function SavedCities({ saved, recents, onSelect, onRemove, showRecents = false }) {
  if ((!saved || saved.length === 0) && (!showRecents || !recents || recents.length === 0)) return null

  return (
    <div className="mt-10 w-full max-w-2xl text-left">
      {saved?.length > 0 && (
        <section aria-label="Saved cities" className="anim-fade-up delay-3">
          <h2 className="mb-2.5 text-xs font-bold uppercase tracking-widest text-white/60">Saved cities</h2>
          <ul className="flex flex-wrap gap-2">
            {saved.map((city) => (
              <li key={city.id} className="group flex items-center">
                <button
                  type="button"
                  onClick={() => onSelect(city)}
                  className="glass flex items-center gap-2 rounded-full py-2 pl-3.5 pr-2.5 text-sm font-semibold transition hover:bg-white/20"
                >
                  <Star aria-hidden className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                  {city.name}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${city.name} from saved cities`}
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemove(city.id)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.stopPropagation()
                        onRemove(city.id)
                      }
                    }}
                    className="-mr-1 -my-1.5 flex min-h-8 min-w-8 items-center justify-center rounded-full p-1.5 text-white/60 transition hover:bg-white/20 hover:text-white"
                  >
                    <X aria-hidden className="h-3.5 w-3.5" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {showRecents && recents?.length > 0 && (
        <section aria-label="Recent searches" className="anim-fade-up delay-3 mt-5">
          <h2 className="mb-2.5 text-xs font-bold uppercase tracking-widest text-white/60">Recent searches</h2>
          <ul className="flex flex-wrap gap-2">
            {recents.map((city) => (
              <li key={city.id}>
                <button
                  type="button"
                  onClick={() => onSelect(city)}
                  className="glass rounded-full px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/20"
                >
                  {city.name}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
