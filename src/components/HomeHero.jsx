import { Loader2, MapPin } from 'lucide-react'
import SavedCities from './SavedCities'

// Home screen (PRD "Home" screen): tagline, location access, search hint,
// plus saved cities and recent searches for returning users.

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
      <p className="anim-fade-in text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
        Weather Catch
      </p>
      <h1 className="anim-fade-up mt-3 max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
        Know your weather <span className="text-amber-300">before</span> it catches you.
      </h1>
      <p className="anim-fade-up delay-1 mt-4 max-w-xl text-white/75">
        Search any city above, or let us find weather for where you are right now.
      </p>

      <button
        type="button"
        onClick={onUseMyLocation}
        disabled={busy}
        className="anim-fade-up delay-2 mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-bold text-slate-900 shadow-lg transition hover:bg-white/90 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-80"
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
