import { Loader2, MapPin } from 'lucide-react'
import SavedCities from './SavedCities'
import { POPULAR_CITIES } from '../lib/popularCities'

// Home screen (PRD "Home" screen): quick-access Indian cities under the search
// bar, tagline, location access, plus saved cities and recent searches.

export default function HomeHero({
  onUseMyLocation,
  geoStatus,
  saved,
  recents,
  onSelectCity,
  onRemoveCity,
}) {
  const busy = geoStatus === 'locating'

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-10 text-center sm:px-6">
      {/* One-tap popular cities, directly under the header search bar */}
      <section aria-label="Popular cities in India" className="anim-fade-in w-full max-w-2xl">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/60">
          Popular in India
        </h2>
        <ul className="mt-3 flex flex-wrap justify-center gap-2">
          {POPULAR_CITIES.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onClick={() => onSelectCity(city)}
                className="glass flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20 active:scale-[0.97]"
              >
                <MapPin aria-hidden className="h-3.5 w-3.5 text-amber-300" />
                {city.name}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <p className="anim-fade-in mt-10 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
        Weather Catch
      </p>
      <h1 className="anim-fade-up mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        Know your weather <span className="text-amber-300">before</span> it catches you.
      </h1>
      <p className="anim-fade-up delay-1 mt-4 max-w-xl text-white/75">
        Search any city above, or let us find weather for where you are right now.
      </p>

      <button
        type="button"
        onClick={onUseMyLocation}
        disabled={busy}
        className="btn-glossy anim-fade-up delay-2 mt-8 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-bold"
      >
        {busy ? (
          <Loader2 aria-hidden className="h-5 w-5 animate-spin" />
        ) : (
          <MapPin aria-hidden className="h-5 w-5" />
        )}
        {busy ? 'Finding you…' : 'Use My Location'}
      </button>

      {geoStatus === 'denied' && (
        <p role="alert" className="mt-4 rounded-xl bg-red-500/25 px-4 py-2.5 text-sm text-white">
          Location access was denied. No problem — just search for any city above.
        </p>
      )}
      {geoStatus === 'error' && (
        <p role="alert" className="mt-4 rounded-xl bg-red-500/25 px-4 py-2.5 text-sm text-white">
          We couldn’t detect your location. Please try again or search for a city above.
        </p>
      )}

      <SavedCities
        saved={saved}
        recents={recents}
        onSelect={onSelectCity}
        onRemove={onRemoveCity}
        showRecents
      />
    </main>
  )
}
