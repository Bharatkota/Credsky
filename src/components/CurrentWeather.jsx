import { Cloud, Droplets, Eye, Gauge, RefreshCw, Star, Thermometer, Wind } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import Minion from './Minion'
import { getThemeKey, getWeatherInfo } from '../lib/weatherCodes'
import {
  formatAge,
  formatPercent,
  formatPressure,
  formatTemp,
  formatVisibility,
  formatWind,
} from '../lib/units'

// FR-03: current weather dashboard — temperature, condition, feels-like,
// humidity, wind, pressure, visibility, cloud coverage + data freshness.

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="glass rounded-2xl p-3.5 sm:p-4">
      <div className="flex items-center gap-2 text-white/65">
        <Icon aria-hidden className="h-4 w-4" />
        <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
      </div>
      <p className="mt-1.5 text-lg font-bold sm:text-xl">{value}</p>
    </div>
  )
}

export default function CurrentWeather({
  location,
  weather,
  unit,
  saved,
  onSaveToggle,
  onRefresh,
  refreshing,
}) {
  const current = weather.current
  const info = getWeatherInfo(current.weather_code, current.is_day === 1)
  const isSaved = saved.some((c) => c.id === location.id)

  const placeLine = [location.admin1, location.country].filter(Boolean).join(', ')

  return (
    <section aria-label={`Current weather in ${location.name}`} className="anim-fade-up">
      <div className="glass-strong glossy rounded-[28px] p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-2xl font-extrabold sm:text-3xl">{location.name}</h1>
              <button
                type="button"
                onClick={() => onSaveToggle(location)}
                aria-label={isSaved ? `Remove ${location.name} from saved cities` : `Save ${location.name}`}
                aria-pressed={isSaved}
                className="rounded-full p-1.5 transition hover:bg-white/15"
              >
                <Star
                  aria-hidden
                  className={`h-5 w-5 transition ${isSaved ? 'fill-amber-300 text-amber-300' : 'text-white/70'}`}
                />
              </button>
            </div>
            {placeLine && <p className="mt-0.5 text-sm text-white/70">{placeLine}</p>}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            aria-label="Refresh weather data"
            className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-white/85 transition hover:bg-white/20 disabled:opacity-60"
          >
            <RefreshCw aria-hidden className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-4">
            <WeatherIcon icon={info.icon} className="h-16 w-16 shrink-0 sm:h-20 sm:w-20" />
            <div>
              <p className="text-6xl font-extrabold leading-none tracking-[-0.045em] sm:text-7xl">
                {formatTemp(current.temperature_2m, unit)}
              </p>
              <p className="mt-1.5 text-lg font-semibold text-white/85">{info.label}</p>
            </div>
          </div>

          {/* The mascot reacts to conditions and feels-like temperature */}
          <Minion
            themeKey={getThemeKey(current.weather_code, current.is_day === 1)}
            feelsLike={current.apparent_temperature}
          />

          <div className="text-sm text-white/75">
            <p>
              Feels like <span className="font-bold text-white">{formatTemp(current.apparent_temperature, unit)}</span>
            </p>
            <p className="mt-1" title="Local time at this location, per the location's timezone">
              {formatAge(weather.fetchedAt)}
            </p>
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6" aria-label="Weather metrics">
          <li><Metric icon={Thermometer} label="Feels like" value={formatTemp(current.apparent_temperature, unit)} /></li>
          <li><Metric icon={Droplets} label="Humidity" value={formatPercent(current.relative_humidity_2m)} /></li>
          <li><Metric icon={Wind} label="Wind" value={formatWind(current.wind_speed_10m, unit)} /></li>
          <li><Metric icon={Gauge} label="Pressure" value={formatPressure(current.pressure_msl)} /></li>
          <li><Metric icon={Eye} label="Visibility" value={weather.currentVisibility != null ? formatVisibility(weather.currentVisibility, unit) : 'N/A'} /></li>
          <li><Metric icon={Cloud} label="Cloud cover" value={formatPercent(current.cloud_cover)} /></li>
        </ul>
      </div>
    </section>
  )
}
