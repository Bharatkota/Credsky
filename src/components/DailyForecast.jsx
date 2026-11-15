import { useEffect } from 'react'
import { Droplets, Sunrise, Sunset } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { getWeatherInfo } from '../lib/weatherCodes'
import { formatClock, formatDay, formatDayLong, formatTemp } from '../lib/units'
import { events } from '../lib/analytics'

// FR-05: seven-day forecast (min/max, condition, precipitation probability)
// plus sunrise/sunset for today (PRD "Should have" — sun times).

export default function DailyForecast({ daily, unit }) {
  useEffect(() => {
    events.forecastEngaged('daily')
  }, [daily])

  if (!daily?.length) return null
  const today = daily[0]

  return (
    <section aria-label="Seven-day forecast" className="anim-fade-up delay-2">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <h2 className="text-sm font-bold uppercase tracking-widest text-white/70">7-day forecast</h2>
        {today.sunrise && today.sunset && (
          <p className="flex items-center gap-3 text-xs font-semibold text-white/70" aria-label={`Sunrise ${formatClock(today.sunrise)}, sunset ${formatClock(today.sunset)}`}>
            <span className="flex items-center gap-1">
              <Sunrise aria-hidden className="h-3.5 w-3.5 text-amber-300" />
              {formatClock(today.sunrise)}
            </span>
            <span className="flex items-center gap-1">
              <Sunset aria-hidden className="h-3.5 w-3.5 text-amber-300" />
              {formatClock(today.sunset)}
            </span>
          </p>
        )}
      </div>

      <ul className="glass mt-2.5 divide-y divide-white/10 rounded-3xl px-2 sm:px-4">
        {daily.map((d, i) => {
          const info = getWeatherInfo(d.weather_code, true)
          return (
            <li key={d.date} className="flex items-center gap-3 px-2 py-3 sm:gap-5 sm:px-3">
              <span className="w-16 shrink-0 sm:w-24">
                <span className="block text-sm font-bold sm:text-[15px]">{formatDay(d.date, i)}</span>
                <span className="block truncate text-[11px] text-white/55">{formatDayLong(d.date)}</span>
              </span>
              <WeatherIcon icon={info.icon} className="h-8 w-8 shrink-0" animate={false} />
              <span className="hidden min-w-0 flex-1 truncate text-sm text-white/75 sm:block">
                {info.label}
              </span>
              <span className="ml-auto flex shrink-0 items-center gap-1 text-xs font-semibold text-sky-200 sm:w-20 sm:justify-end">
                <span className="sr-only">Chance of precipitation: </span>
                <Droplets aria-hidden className="h-3 w-3" />
                {d.precipProbability != null ? `${Math.round(d.precipProbability)}%` : '–'}
              </span>
              <span className="flex w-24 shrink-0 items-baseline justify-end gap-2 sm:w-28">
                <span className="text-sm font-semibold text-white/60">
                  <span className="sr-only">Low: </span>
                  {formatTemp(d.tempMin, unit)}
                </span>
                <span className="text-sm font-extrabold sm:text-base">
                  <span className="sr-only">High: </span>
                  {formatTemp(d.tempMax, unit)}
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
