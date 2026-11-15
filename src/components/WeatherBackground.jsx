import { useMemo } from 'react'
import { THEMES } from '../lib/weatherCodes'

// Weather-responsive animated background (FR-08).
// Layers are chosen by condition theme: sun glow (clear day), moon + twinkling
// stars (clear night), drifting clouds (cloud/rain/snow/thunder), falling rain,
// snowflakes, fog banks, and an occasional lightning flash.
// Everything is decorative (aria-hidden), CSS-only, and respects
// prefers-reduced-motion via the global stylesheet override.

const rand = (min, max) => min + Math.random() * (max - min)

function Clouds({ night }) {
  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        top: [6, 16, 28, 12][i],
        left: [-12, 22, 58, 84][i] + rand(-6, 6),
        w: rand(200, 340),
        h: rand(60, 100),
        dur: rand(26, 48),
        delay: -rand(0, 30),
        op: rand(0.5, 0.9),
      })),
    [],
  )
  return clouds.map((c, i) => (
    <div
      key={i}
      className="bg-cloud anim-cloud"
      style={{
        top: `${c.top}%`,
        left: `${c.left}%`,
        width: c.w,
        height: c.h,
        opacity: c.op,
        animationDuration: `${c.dur}s`,
        animationDelay: `${c.delay}s`,
        background: night
          ? 'rgba(148, 163, 184, 0.10)'
          : 'rgba(255, 255, 255, 0.13)',
      }}
    />
  ))
}

export default function WeatherBackground({ themeKey }) {
  const theme = THEMES[themeKey] || THEMES['cloudy-day']
  const night = themeKey.endsWith('-night')

  const drops = useMemo(
    () =>
      Array.from({ length: 42 }, () => ({
        left: rand(-2, 102),
        delay: -rand(0, 4),
        dur: rand(0.9, 2.2),
        len: rand(12, 26),
        op: rand(0.25, 0.55),
      })),
    [themeKey],
  )

  const flakes = useMemo(
    () =>
      Array.from({ length: 32 }, () => ({
        left: rand(-2, 102),
        delay: -rand(0, 14),
        dur: rand(9, 18),
        size: rand(3, 7),
        op: rand(0.5, 0.95),
      })),
    [themeKey],
  )

  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, () => ({
        left: rand(0, 100),
        top: rand(0, 62),
        size: rand(1.5, 3),
        dur: rand(2, 5.5),
        delay: -rand(0, 5),
      })),
    [themeKey],
  )

  const showClouds = themeKey.startsWith('cloudy') || themeKey === 'rain' || themeKey === 'thunder' || themeKey === 'snow'
  const showRain = themeKey === 'rain' || themeKey === 'thunder'

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ambient glow shared by every theme */}
      <div
        className="anim-drift absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${theme.orb}, transparent 65%)` }}
      />
      <div
        className="anim-drift absolute -bottom-32 -left-20 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${theme.orb}, transparent 65%)`, animationDelay: '4s' }}
      />

      {/* Clear day — pulsing sun glow */}
      {themeKey === 'clear-day' && (
        <div className="absolute -top-28 right-[8%] h-[26rem] w-[26rem]">
          <div className="bg-sun anim-sun absolute inset-0 rounded-full" />
        </div>
      )}

      {/* Clear night — moon + twinkling stars */}
      {themeKey === 'clear-night' && (
        <>
          <div
            className="absolute top-10 right-[12%] h-40 w-40 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(circle, rgba(226,232,240,0.5), transparent 70%)' }}
          />
          {stars.map((s, i) => (
            <div
              key={i}
              className="bg-star anim-twinkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                animationDuration: `${s.dur}s`,
                animationDelay: `${s.delay}s`,
              }}
            />
          ))}
        </>
      )}

      {/* Cloud masses */}
      {showClouds && <Clouds night={night} />}

      {/* Falling rain */}
      {showRain &&
        drops.map((d, i) => (
          <div
            key={`r${i}`}
            className="bg-drop anim-fall"
            style={{
              left: `${d.left}%`,
              height: d.len,
              opacity: d.op,
              animationDuration: `${d.dur}s`,
              animationDelay: `${d.delay}s`,
            }}
          />
        ))}

      {/* Falling snow */}
      {themeKey === 'snow' &&
        flakes.map((f, i) => (
          <div
            key={`s${i}`}
            className="bg-flake anim-snow"
            style={{
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              opacity: f.op,
              animationDuration: `${f.dur}s`,
              animationDelay: `${f.delay}s`,
            }}
          />
        ))}

      {/* Fog banks */}
      {themeKey === 'fog' &&
        [8, 34, 62].map((top, i) => (
          <div
            key={`f${i}`}
            className="bg-fogband anim-fogdrift"
            style={{
              top: `${top}%`,
              animationDuration: `${18 + i * 7}s`,
              animationDelay: `${-i * 6}s`,
            }}
          />
        ))}

      {/* Thunder — occasional lightning flash above the rain */}
      {themeKey === 'thunder' && <div className="bg-flash anim-flash" />}
    </div>
  )
}
