// WMO weather interpretation codes (Open-Meteo)
// Maps each code to a human label, an icon key, and a visual theme.

export function getWeatherInfo(code, isDay = true) {
  const info = WMO[code] || { label: 'Unknown', icon: 'cloud' }
  if (info.nightIcon && !isDay) return { ...info, icon: info.nightIcon }
  return info
}

const WMO = {
  0:  { label: 'Clear sky', icon: 'sun', nightIcon: 'moon' },
  1:  { label: 'Mainly clear', icon: 'sun', nightIcon: 'moon' },
  2:  { label: 'Partly cloudy', icon: 'partly-day', nightIcon: 'partly-night' },
  3:  { label: 'Overcast', icon: 'cloud' },
  45: { label: 'Fog', icon: 'fog' },
  48: { label: 'Rime fog', icon: 'fog' },
  51: { label: 'Light drizzle', icon: 'drizzle' },
  53: { label: 'Drizzle', icon: 'drizzle' },
  55: { label: 'Dense drizzle', icon: 'drizzle' },
  56: { label: 'Freezing drizzle', icon: 'drizzle' },
  57: { label: 'Freezing drizzle', icon: 'drizzle' },
  61: { label: 'Slight rain', icon: 'rain' },
  63: { label: 'Rain', icon: 'rain' },
  65: { label: 'Heavy rain', icon: 'rain' },
  66: { label: 'Freezing rain', icon: 'rain' },
  67: { label: 'Freezing rain', icon: 'rain' },
  71: { label: 'Light snow', icon: 'snow' },
  73: { label: 'Snow', icon: 'snow' },
  75: { label: 'Heavy snow', icon: 'snow' },
  77: { label: 'Snow grains', icon: 'snow' },
  80: { label: 'Light showers', icon: 'rain' },
  81: { label: 'Showers', icon: 'rain' },
  82: { label: 'Heavy showers', icon: 'rain' },
  85: { label: 'Snow showers', icon: 'snow' },
  86: { label: 'Snow showers', icon: 'snow' },
  95: { label: 'Thunderstorm', icon: 'thunder' },
  96: { label: 'Thunderstorm, hail', icon: 'thunder' },
  99: { label: 'Severe thunderstorm', icon: 'thunder' },
}

export function getThemeKey(code, isDay = true) {
  if (code === 0 || code === 1) return isDay ? 'clear-day' : 'clear-night'
  if (code === 2 || code === 3) return isDay ? 'cloudy-day' : 'cloudy-night'
  if (code === 45 || code === 48) return 'fog'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain'
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow'
  if (code >= 95) return 'thunder'
  return isDay ? 'cloudy-day' : 'cloudy-night'
}

export const THEMES = {
  'clear-day': {
    gradient: 'linear-gradient(180deg, #38bdf8 0%, #0ea5e9 40%, #075985 100%)',
    orb: 'rgba(253, 224, 71, 0.55)',
  },
  'clear-night': {
    gradient: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 55%, #312e81 100%)',
    orb: 'rgba(226, 232, 240, 0.25)',
  },
  'cloudy-day': {
    gradient: 'linear-gradient(180deg, #7ba0bf 0%, #64748b 45%, #334155 100%)',
    orb: 'rgba(255, 255, 255, 0.3)',
  },
  'cloudy-night': {
    gradient: 'linear-gradient(180deg, #1e293b 0%, #0f172a 55%, #1e1b4b 100%)',
    orb: 'rgba(148, 163, 184, 0.2)',
  },
  rain: {
    gradient: 'linear-gradient(180deg, #475569 0%, #1e293b 50%, #0f172a 100%)',
    orb: 'rgba(125, 211, 252, 0.22)',
  },
  thunder: {
    gradient: 'linear-gradient(180deg, #3b2f63 0%, #1e1b4b 50%, #0f172a 100%)',
    orb: 'rgba(250, 204, 21, 0.25)',
  },
  snow: {
    gradient: 'linear-gradient(180deg, #9fb3c8 0%, #64748b 50%, #334155 100%)',
    orb: 'rgba(255, 255, 255, 0.4)',
  },
  fog: {
    gradient: 'linear-gradient(180deg, #6b7280 0%, #4b5563 50%, #374151 100%)',
    orb: 'rgba(255, 255, 255, 0.28)',
  },
}
