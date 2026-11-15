import { useEffect, useRef } from 'react'
import { Droplets } from 'lucide-react'
import WeatherIcon from './WeatherIcon'
import { getWeatherInfo } from '../lib/weatherCodes'
import { formatHour, formatTemp } from '../lib/units'
import { events } from '../lib/analytics'

// FR-04: next 24 hours — temperature, condition icon, precipitation probability,
// local forecast times. Horizontally scrollable, snaps, and scroll-announced.

export default function HourlyForecast({ hourly, unit }) {
  const scrollerRef = useRef(null)

  useEffect(() => {
    events.forecastEngaged('hourly')
  }, [hourly])

  if (!hourly?.length) return null

  return (
    <section aria-label="Hourly forecast for the next 24 hours" className="anim-fade-up delay-1">
      <h2 className="mb-2.5 px-1 text-sm font-bold uppercase tracking-widest text-white/70">
        Next 24 hours
      </h2>
      <div
        ref={scrollerRef}
        className="hourly-scroll glass flex snap-x gap-2 overflow-x-auto rounded-[28px] p-3 sm:gap-3"
      >
        {hourly.map((h, i) => {
          const info = getWeatherInfo(h.weather_code, h.isDay)
          return (
            <div
              key={h.time}
              className="flex w-[68px] shrink-0 snap-start flex-col items-center gap-1.5 rounded-2xl px-1.5 py-2.5 text-center transition sm:w-[76px] hover:bg-white/10"
            >
              <span className={`text-xs font-bold ${i === 0 ? 'text-amber-300' : 'text-white/70'}`}>
                {i === 0 ? 'Now' : formatHour(h.time)}
              </span>
              <WeatherIcon icon={info.icon} className="h-8 w-8" animate={false} />
              <span className="text-sm font-bold">{formatTemp(h.temperature, unit)}</span>
              <span className="flex items-center gap-0.5 text-[11px] font-medium text-sky-200">
                <span className="sr-only">Chance of precipitation: </span>
                <Droplets aria-hidden className="h-3 w-3" />
                {h.precipProbability != null ? `${Math.round(h.precipProbability)}%` : '–'}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
