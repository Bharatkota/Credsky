import { useEffect, useId, useRef, useState } from 'react'
import { Loader2, MapPin, Search } from 'lucide-react'
import * as api from '../lib/api'
import { events } from '../lib/analytics'

// FR-02: city search with autocomplete, disambiguation (country/region) and full
// keyboard interaction (ArrowUp/Down, Enter, Escape). Empty input never triggers
// an API request; results are debounced and abortable.

export default function SearchBar({ onSelect, className = '' }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const [searching, setSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)

  const abortRef = useRef(null)
  const debounceRef = useRef(null)
  const containerRef = useRef(null)
  const listboxId = useId()

  useEffect(() => {
    return () => {
      clearTimeout(debounceRef.current)
      abortRef.current?.abort()
    }
  }, [])

  // Close on outside click
  useEffect(() => {
    function onOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  function handleChange(value) {
    setQuery(value)
    setError(null)
    setNotFound(false)

    clearTimeout(debounceRef.current)
    if (!value.trim()) {
      // Acceptance criteria: empty search never triggers a request
      abortRef.current?.abort()
      setResults([])
      setOpen(false)
      setSearching(false)
      return
    }

    setSearching(true)
    setOpen(true)
    debounceRef.current = setTimeout(async () => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller
      try {
        const cities = await api.searchCities(value.trim(), controller.signal)
        if (controller.signal.aborted) return
        setResults(cities)
        setNotFound(cities.length === 0)
        setHighlight(-1)
        setSearching(false)
        events.searchPerformed(value.trim())
      } catch (err) {
        if (err.name === 'AbortError') return
        setResults([])
        setSearching(false)
        setError(err.kind === 'network' ? 'You appear to be offline.' : 'Search is unavailable right now.')
      }
    }, 350)
  }

  function select(city) {
    setOpen(false)
    setQuery('')
    setResults([])
    setHighlight(-1)
    events.searchSelected(city)
    onSelect(city)
  }

  function onKeyDown(e) {
    if (!open || results.length === 0) {
      if (e.key === 'Escape') setOpen(false)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((h) => (h + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => (h <= 0 ? results.length - 1 : h - 1))
    } else if (e.key === 'Enter' && highlight >= 0) {
      e.preventDefault()
      select(results[highlight])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showList = open && (results.length > 0 || searching || notFound || error)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 w-[18px] h-[18px] text-white/70" />
        <input
          type="search"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-label="Search any city"
          placeholder="Search any city..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          autoComplete="off"
          className="search-pill w-full rounded-full py-3 pl-11 pr-11 text-[15px] text-white placeholder-white/55 outline-none transition"
        />
        {searching && (
          <Loader2 aria-label="Searching" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/80 animate-spin" />
        )}
      </div>

      {showList && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="City suggestions"
          className="absolute z-40 mt-2 w-full max-h-80 overflow-y-auto rounded-2xl border border-white/20 bg-slate-950/70 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] py-1.5"
        >
          {results.map((city, i) => (
            <li key={`${city.id}-${i}`} role="none">
              <button
                type="button"
                role="option"
                aria-selected={i === highlight}
                onClick={() => select(city)}
                onMouseEnter={() => setHighlight(i)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition ${
                  i === highlight ? 'bg-white/15' : ''
                }`}
              >
                <MapPin aria-hidden className="w-4 h-4 shrink-0 text-white/60" />
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{city.name}</span>
                  <span className="block truncate text-xs text-white/60">
                    {[city.admin1, city.country].filter(Boolean).join(', ')}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {notFound && !searching && (
            <li role="status" className="px-4 py-3 text-sm text-white/70">
              City not found. Try another spelling, or include the country (e.g. “Springfield, USA”).
            </li>
          )}
          {error && (
            <li role="status" className="px-4 py-3 text-sm text-white/70">{error}</li>
          )}
        </ul>
      )}
    </div>
  )
}
