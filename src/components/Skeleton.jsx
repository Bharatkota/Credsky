// Loading skeleton shown while weather data is in flight (FR-01 acceptance:
// slow responses show a loading indicator; stale data is never shown as fresh).

function Bar({ className = '' }) {
  return <div className={`shimmer rounded-full ${className}`} />
}

export default function Skeleton({ locationName }) {
  return (
    <main
      className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6"
      role="status"
      aria-live="polite"
      aria-label={locationName ? `Loading weather for ${locationName}` : 'Loading weather'}
    >
      <div className="glass-strong glossy rounded-[28px] p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <div className="space-y-2.5">
            <Bar className="h-7 w-44" />
            <Bar className="h-3.5 w-28 opacity-70" />
          </div>
          <Bar className="h-8 w-24 rounded-full" />
        </div>
        <div className="mt-6 flex items-center gap-5">
          <Bar className="h-16 w-16 rounded-3xl" />
          <div className="space-y-3">
            <Bar className="h-14 w-36" />
            <Bar className="h-4 w-32 opacity-70" />
          </div>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl p-3.5">
              <Bar className="h-3 w-16 opacity-70" />
              <Bar className="mt-2.5 h-5 w-14" />
            </div>
          ))}
        </div>
      </div>
      <div className="glass mt-4 rounded-3xl p-3">
        <div className="flex gap-2 overflow-hidden sm:gap-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-[68px] shrink-0 rounded-2xl p-2.5 sm:w-[76px]">
              <Bar className="h-3 w-10 opacity-70" />
              <Bar className="mx-auto mt-3 h-8 w-8 rounded-2xl" />
              <Bar className="mx-auto mt-3 h-4 w-10" />
            </div>
          ))}
        </div>
      </div>
      <div className="glass mt-4 rounded-3xl p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-2.5">
            <Bar className="h-4 w-20 opacity-70" />
            <Bar className="h-8 w-8 rounded-2xl" />
            <Bar className="ml-auto h-4 w-24" />
            <Bar className="h-4 w-20" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-white/60">Fetching the latest weather…</p>
    </main>
  )
}
