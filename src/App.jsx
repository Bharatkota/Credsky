import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import HomeHero from './components/HomeHero'
import CurrentWeather from './components/CurrentWeather'
import HourlyForecast from './components/HourlyForecast'
import DailyForecast from './components/DailyForecast'
import SavedCities from './components/SavedCities'
import ErrorState from './components/ErrorState'
import Skeleton from './components/Skeleton'
import Footer from './components/Footer'
import WeatherBackground from './components/WeatherBackground'
import * as api from './lib/api'
import * as storage from './lib/storage'
import { events } from './lib/analytics'
import { getThemeKey, THEMES } from './lib/weatherCodes'

// Status machine: 'home' | 'loading' | 'ready' | 'error'
// Every fresh visit starts on the homepage; previous weather is never shown as
// current while a new location loads (FR-02).

export default function App() {
  const [status, setStatus] = useState('home')
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState(() => storage.getUnit())
  const [saved, setSaved] = useState(() => storage.getSaved())
  const [recents, setRecents] = useState(() => storage.getRecents())
  const [geoStatus, setGeoStatus] = useState('idle') // idle | locating | denied | error
  const [refreshing, setRefreshing] = useState(false)
  // Bumped when returning home so the search bar remounts empty
  const [searchKey, setSearchKey] = useState(0)

  const abortRef = useRef(null)

  useEffect(() => {
    events.appOpened()
  }, [])

  const loadWeather = useCallback(async (loc, { silent = false } = {}) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    if (!silent) {
      setStatus('loading')
      setError(null)
    }
    setRefreshing(true)
    try {
      const data = await api.fetchForecast(loc.latitude, loc.longitude, controller.signal)
      if (controller.signal.aborted) return

      // Current visibility lives in the hourly series; pick the hour matching `now`.
      let currentVisibility = null
      const nowKey = data.current?.time?.slice(0, 13) // "2026-11-15T14"
      const idx = nowKey ? data.hourly.time.findIndex((t) => t.slice(0, 13) === nowKey) : -1
      if (idx >= 0) currentVisibility = data.hourly.visibility?.[idx] ?? null

      // Next 24 hours starting from the current local hour (FR-04)
      const start = idx >= 0 ? idx : 0
      const hourly = []
      for (let i = start; i < Math.min(start + 24, data.hourly.time.length); i++) {
        hourly.push({
          time: data.hourly.time[i],
          temperature: data.hourly.temperature_2m[i],
          weather_code: data.hourly.weather_code[i],
          precipProbability: data.hourly.precipitation_probability?.[i] ?? null,
          isDay: data.current?.is_day ?? 1,
        })
      }

      const daily = data.daily.time.map((date, i) => ({
        date,
        weather_code: data.daily.weather_code[i],
        tempMax: data.daily.temperature_2m_max[i],
        tempMin: data.daily.temperature_2m_min[i],
        precipProbability: data.daily.precipitation_probability_max?.[i] ?? null,
        sunrise: data.daily.sunrise?.[i] ?? null,
        sunset: data.daily.sunset?.[i] ?? null,
      }))

      setWeather({
        current: data.current,
        hourly,
        daily,
        timezone: data.timezone,
        currentVisibility,
        fetchedAt: Date.now(),
      })
      setLocation(loc)
      setStatus('ready')
      events.weatherLoaded(loc)
    } catch (err) {
      if (err.name === 'AbortError') return
      setStatus('error')
      setError(err)
      events.weatherError(err.kind || 'unknown')
    } finally {
      if (!controller.signal.aborted) setRefreshing(false)
    }
  }, [])

  // Abort in-flight weather requests when unmounting
  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const selectCity = useCallback(
    (city) => {
      const loc = {
        id: city.id || `${city.latitude},${city.longitude}`,
        name: city.name,
        admin1: city.admin1 || null,
        country: city.country || null,
        latitude: city.latitude,
        longitude: city.longitude,
      }
      setRecents(storage.addRecent(loc))
      loadWeather(loc)
    },
    [loadWeather],
  )

  // FR-01: location detection — permission requested only after explicit user action
  const useMyLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setGeoStatus('error')
      return
    }
    setGeoStatus('locating')
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        events.locationPermission('granted')
        const { latitude, longitude } = pos.coords
        let loc = await api.reverseGeocode(latitude, longitude).catch(() => null)
        if (!loc) {
          // Never fabricate a place name (FR-01): fall back to a coordinate label
          loc = {
            id: `geo:${latitude.toFixed(4)},${longitude.toFixed(4)}`,
            name: 'My Location',
            admin1: null,
            country: null,
            latitude,
            longitude,
          }
        }
        setGeoStatus('idle')
        selectCity(loc)
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          events.locationPermission('denied')
          setGeoStatus('denied')
        } else {
          events.locationPermission('error')
          setGeoStatus('error')
        }
      },
      { timeout: 12000, maximumAge: 300000 },
    )
  }, [selectCity])

  const toggleUnit = useCallback((u) => {
    if (u === unit) return
    setUnit(u)
    storage.setUnit(u)
    events.unitToggled(u)
  }, [unit])

  const toggleSave = useCallback((city) => {
    if (storage.isSaved(storage.getSaved(), city)) {
      setSaved(storage.removeCity(city.id))
      events.cityRemoved(city)
    } else {
      setSaved(storage.saveCity(city))
      events.citySaved(city)
    }
  }, [])

  const clearData = useCallback(() => {
    storage.clearAll()
    setSaved([])
    setRecents([])
    setWeather(null)
    setLocation(null)
    setStatus('home')
  }, [])

  const goHome = useCallback(() => {
    abortRef.current?.abort()
    setStatus('home')
    setWeather(null)
    setSearchKey((k) => k + 1)
  }, [])

  const themeKey = weather ? getThemeKey(weather.current.weather_code, weather.current.is_day === 1) : 'cloudy-day'
  const theme = THEMES[themeKey]

  return (
    <div
      className="relative flex min-h-screen flex-col transition-[background] duration-700"
      style={{ background: theme.gradient }}
    >
      {/* Weather-responsive animated background (FR-08); decorative only */}
      <WeatherBackground themeKey={themeKey} />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Header
          unit={unit}
          searchKey={searchKey}
          onLogoClick={goHome}
          onUnitChange={{ toggle: toggleUnit, onSearchSelect: selectCity }}
        />

        {status === 'home' && (
          <HomeHero
            onUseMyLocation={useMyLocation}
            geoStatus={geoStatus}
            saved={saved}
            recents={recents}
            onSelectCity={selectCity}
            onRemoveCity={(id) => {
              setSaved(storage.removeCity(id))
            }}
          />
        )}

        {status === 'loading' && <Skeleton locationName={location?.name} />}

        {status === 'error' && (
          <ErrorState
            error={error}
            onRetry={() => location && loadWeather(location)}
            onBackHome={goHome}
          />
        )}

        {status === 'ready' && weather && location && (
          <main className="mx-auto w-full max-w-5xl flex-1 space-y-4 px-4 py-6 sm:space-y-5 sm:px-6">
            <CurrentWeather
              location={location}
              weather={weather}
              unit={unit}
              saved={saved}
              onSaveToggle={toggleSave}
              onRefresh={() => loadWeather(location, { silent: true })}
              refreshing={refreshing}
            />
            <HourlyForecast hourly={weather.hourly} unit={unit} />
            <DailyForecast daily={weather.daily} unit={unit} />
            <SavedCities
              saved={saved}
              onSelect={selectCity}
              onRemove={(id) => setSaved(storage.removeCity(id))}
            />
          </main>
        )}

        <Footer onClearData={clearData} />
      </div>
    </div>
  )
}
