import SearchBar from './SearchBar'

// Logo, global search and the °C/°F segmented toggle (FR-06).

function Logo() {
  return (
    <a href="/" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 shrink-0" aria-label="WeatherCatch home">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7 text-amber-300" aria-hidden>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M9 2.8v1.4M4 8h1.4M5.3 4.3l1 1M12.7 4.3l-1 1" />
        <path d="M10.5 19.5h8a3 3 0 0 0 .4-6 4.4 4.4 0 0 0-8.3-1 3.6 3.6 0 0 0-.1 7Z" fill="rgba(255,255,255,0.18)" stroke="white" />
      </svg>
      <span className="font-extrabold text-lg tracking-tight whitespace-nowrap">
        Weather<span className="text-amber-300">Catch</span>
      </span>
    </a>
  )
}

export default function Header({ unit, onUnitChange }) {
  return (
    <header className="w-full">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 pt-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
        <Logo />
        <SearchBar onSelect={onUnitChange.onSearchSelect} className="order-3 w-full sm:order-2 sm:flex-1" />
        <div
          role="radiogroup"
          aria-label="Temperature unit"
          className="order-2 flex shrink-0 self-start rounded-full border border-white/20 bg-white/10 p-0.5 sm:order-3 sm:self-auto"
        >
          {['C', 'F'].map((u) => (
            <button
              key={u}
              type="button"
              role="radio"
              aria-checked={unit === u}
              onClick={() => onUnitChange.toggle(u)}
              className={`w-10 rounded-full py-1.5 text-sm font-bold transition ${
                unit === u ? 'bg-white text-slate-900 shadow' : 'text-white/75 hover:text-white'
              }`}
            >
              °{u}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
