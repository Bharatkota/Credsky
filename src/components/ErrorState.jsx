import { AlertTriangle, CloudOff, RefreshCw, WifiOff } from 'lucide-react'

// Edge-case handling (PRD §12): offline, city not found, rate limit,
// API outage. Always offers a retry and never fabricates data.

const ICONS = {
  network: WifiOff,
  'not-found': CloudOff,
  'rate-limit': AlertTriangle,
  server: AlertTriangle,
}

export default function ErrorState({ error, onRetry, onBackHome }) {
  const Icon = ICONS[error?.kind] || AlertTriangle
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="glass rounded-3xl p-8 sm:p-10 max-w-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20">
          <Icon aria-hidden className="h-8 w-8 text-red-200" />
        </div>
        <h1 className="mt-5 text-xl font-extrabold sm:text-2xl">Something caught us off guard</h1>
        <p role="alert" className="mt-2.5 text-sm leading-relaxed text-white/80">
          {error?.message || 'An unexpected error occurred.'}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {error?.kind !== 'not-found' && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-900 transition hover:bg-white/90 active:scale-[0.98]"
            >
              <RefreshCw aria-hidden className="h-4 w-4" />
              Try again
            </button>
          )}
          <button
            type="button"
            onClick={onBackHome}
            className="glass rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20"
          >
            Search a city
          </button>
        </div>
      </div>
    </main>
  )
}
