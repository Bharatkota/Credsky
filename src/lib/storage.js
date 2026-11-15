// Browser local storage persistence (FR-06 unit, FR-07 saved cities, recents, last view).
// Keys are namespaced and every read is defensive against corrupt data.

const KEYS = {
  unit: 'wc:unit',
  saved: 'wc:savedCities',
  recent: 'wc:recentSearches',
  last: 'wc:lastLocation',
}

export const MAX_SAVED = 10
export const MAX_RECENT = 5

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw == null) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function write(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Storage may be unavailable (private mode / quota). Fail silently —
    // the app still works, it just won't persist.
  }
}

export function clearAll() {
  try {
    Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k))
  } catch {
    /* noop */
  }
}

// ---- Temperature unit (FR-06) ----

export function getUnit() {
  return read(KEYS.unit, 'C') === 'F' ? 'F' : 'C'
}

export function setUnit(unit) {
  write(KEYS.unit, unit === 'F' ? 'F' : 'C')
}

// ---- Saved cities (FR-07) ----

export function getSaved() {
  const list = read(KEYS.saved, [])
  return Array.isArray(list) ? list.filter((c) => c && c.name != null) : []
}

export function saveCity(city) {
  const list = getSaved().filter((c) => c.id !== city.id)
  list.unshift(city)
  const trimmed = list.slice(0, MAX_SAVED)
  write(KEYS.saved, trimmed)
  return trimmed
}

export function removeCity(id) {
  const trimmed = getSaved().filter((c) => c.id !== id)
  write(KEYS.saved, trimmed)
  return trimmed
}

export function isSaved(list, city) {
  return list.some((c) => c.id === city.id)
}

// ---- Recent searches ----

export function getRecents() {
  const list = read(KEYS.recent, [])
  return Array.isArray(list) ? list.filter((c) => c && c.name != null) : []
}

export function addRecent(city) {
  const list = getRecents().filter((c) => c.id !== city.id)
  list.unshift(city)
  const trimmed = list.slice(0, MAX_RECENT)
  write(KEYS.recent, trimmed)
  return trimmed
}

// ---- Last viewed location (restores dashboard on return visits) ----

export function getLastLocation() {
  const loc = read(KEYS.last, null)
  return loc && typeof loc.latitude === 'number' && typeof loc.longitude === 'number' ? loc : null
}

export function setLastLocation(city) {
  write(KEYS.last, city)
}
