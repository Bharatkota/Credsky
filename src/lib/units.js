// Unit formatting and conversion.
// FR-06: conversion happens client-side — never triggers a new weather API request.

// Convert display unit: 'C' keeps Open-Meteo's metric values, 'F' converts for display only.
export function toDisplayTemp(celsius, unit) {
  if (celsius == null || Number.isNaN(celsius)) return null
  return unit === 'F' ? celsius * (9 / 5) + 32 : celsius
}

export function formatTemp(celsius, unit) {
  const v = toDisplayTemp(celsius, unit)
  if (v == null) return 'N/A'
  return `${Math.round(v)}°`
}

export function formatWind(kmh, unit) {
  if (kmh == null || Number.isNaN(kmh)) return 'N/A'
  if (unit === 'F') {
    const mph = kmh * 0.621371
    return `${Math.round(mph)} mph`
  }
  return `${Math.round(kmh)} km/h`
}

export function formatVisibility(meters, unit) {
  if (meters == null || Number.isNaN(meters)) return 'N/A'
  if (unit === 'F') {
    const miles = meters / 1609.344
    return `${miles >= 10 ? Math.round(miles) : miles.toFixed(1)} mi`
  }
  const km = meters / 1000
  return `${km >= 10 ? Math.round(km) : km.toFixed(1)} km`
}

export function formatPercent(value) {
  if (value == null || Number.isNaN(value)) return 'N/A'
  return `${Math.round(value)}%`
}

export function formatPressure(hPa) {
  if (hPa == null || Number.isNaN(hPa)) return 'N/A'
  return `${Math.round(hPa)} hPa`
}

// Open-Meteo hourly values are local ISO strings like "2026-11-15T14:00" (timezone=auto).
export function formatHour(isoString) {
  if (!isoString) return ''
  const hour = Number.parseInt(isoString.slice(11, 13), 10)
  if (Number.isNaN(hour)) return ''
  const period = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${h12} ${period}`
}

export function formatClock(isoString) {
  if (!isoString) return ''
  const hh = isoString.slice(11, 13)
  const mm = isoString.slice(14, 16)
  if (!hh || !mm) return ''
  const hour = Number.parseInt(hh, 10)
  if (Number.isNaN(hour)) return isoString.slice(11, 16)
  const period = hour >= 12 ? 'PM' : 'AM'
  const h12 = hour % 12 === 0 ? 12 : hour % 12
  return `${h12}:${mm} ${period}`
}

// Daily values are date-only strings like "2026-11-15".
export function formatDay(dateString, index) {
  if (index === 0) return 'Today'
  if (!dateString) return ''
  const d = new Date(`${dateString}T12:00:00`)
  if (Number.isNaN(d.getTime())) return dateString
  return d.toLocaleDateString('en-US', { weekday: 'short' })
}

export function formatDayLong(dateString) {
  if (!dateString) return ''
  const d = new Date(`${dateString}T12:00:00`)
  if (Number.isNaN(d.getTime())) return dateString
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })
}

// Relative age of the data, e.g. "Updated 5 min ago" (NFR: never show stale data as fresh)
export function formatAge(fetchedAt) {
  if (!fetchedAt) return ''
  const mins = Math.max(0, Math.round((Date.now() - fetchedAt) / 60000))
  if (mins === 0) return 'Updated just now'
  if (mins === 1) return 'Updated 1 min ago'
  if (mins < 60) return `Updated ${mins} min ago`
  const hours = Math.round(mins / 60)
  return `Updated ${hours} hr ago`
}
