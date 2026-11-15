// Lightweight analytics event logging (PRD §11).
// Events are queued on window.__wcEvents for debugging and are ready to be wired
// to any collector (e.g. Vercel Analytics custom events) without touching call sites.

const queue = []

export function track(event, props = {}) {
  const entry = { event, props, at: new Date().toISOString() }
  queue.push(entry)
  if (queue.length > 100) queue.shift()
  if (typeof window !== 'undefined') {
    window.__wcEvents = queue
  }
  // eslint-disable-next-line no-console
  console.debug('[weather-catch]', event, props)
}

export const events = {
  appOpened: () => track('app_opened'),
  locationPermission: (result) => track('location_permission', { result }),
  searchPerformed: (query) => track('search_performed', { queryLength: query.length }),
  searchSelected: (city) => track('search_selected', { city: city.name }),
  weatherLoaded: (city) => track('weather_loaded', { city: city.name }),
  weatherError: (kind) => track('weather_error', { kind }),
  forecastEngaged: (which) => track('forecast_engaged', { which }),
  unitToggled: (unit) => track('unit_toggled', { unit }),
  citySaved: (city) => track('city_saved', { city: city.name }),
  cityRemoved: (city) => track('city_removed', { city: city.name }),
}
