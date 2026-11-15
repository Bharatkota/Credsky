// API client for Open-Meteo (geocoding + forecast) and BigDataCloud (reverse geocoding).
// No private credentials are required, so no key is ever exposed (PRD FR/NFR + §13).

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const REVERSE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

export class ApiError extends Error {
  constructor(kind, message, status) {
    super(message)
    this.kind = kind // 'not-found' | 'rate-limit' | 'network' | 'server'
    this.status = status
  }
}

async function request(url, signal) {
  let res
  try {
    res = await fetch(url, { signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    throw new ApiError('network', 'No internet connection. Check your network and try again.')
  }
  if (res.ok) return res.json()
  if (res.status === 429) {
    throw new ApiError('rate-limit', 'Weather service is busy right now. Please try again in a minute.')
  }
  if (res.status === 400) {
    throw new ApiError('not-found', 'City not found. Try a different spelling or add the country name.')
  }
  throw new ApiError('server', 'Weather service is temporarily unavailable. Please try again.')
}

// FR-02: city search → candidate locations
export async function searchCities(query, signal) {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=8&language=en&format=json`
  const data = await request(url, signal)
  return (data.results || []).map((r) => ({
    id: `${r.id}`,
    name: r.name,
    admin1: r.admin1 || null,
    country: r.country || null,
    countryCode: r.country_code || null,
    latitude: r.latitude,
    longitude: r.longitude,
  }))
}

// FR-01/03/04/05: current weather + hourly + daily in a single request
export async function fetchForecast(latitude, longitude, signal) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m',
    hourly: 'temperature_2m,weather_code,precipitation_probability,visibility',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto',
    forecast_days: '7',
  })
  const data = await request(`${FORECAST_URL}?${params}`, signal)
  if (!data.current || !data.hourly || !data.daily) {
    throw new ApiError('server', 'Weather data is incomplete right now. Please try again.')
  }
  return data
}

// FR-01: resolve device coordinates into a place name.
// Returns null (never fabricated data) if reverse geocoding fails; caller falls back
// to a coordinate label while weather data still loads.
export async function reverseGeocode(latitude, longitude, signal) {
  try {
    const data = await request(
      `${REVERSE_URL}?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      signal,
    )
    const name = data.city || data.locality || data.principalSubdivision || data.countryName
    if (!name) return null
    return {
      name,
      admin1: data.principalSubdivision || null,
      country: data.countryName || null,
      countryCode: data.countryCode || null,
      latitude,
      longitude,
    }
  } catch (err) {
    if (err.name === 'AbortError') throw err
    return null
  }
}
