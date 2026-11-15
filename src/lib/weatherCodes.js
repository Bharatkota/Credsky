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
    gradient: 'linear-gradient(180deg, #7cc4f8 0%, #2e90e0 45%, #0a5a9e 100%)',
    orb: 'rgba(253, 224, 71, 0.5)',
  },
  'clear-night': {
    gradient: 'linear-gradient(180deg, #0a1020 0%, #1a2142 55%, #2b2a5e 100%)',
    orb: 'rgba(226, 232, 240, 0.22)',
  },
  'cloudy-day': {
    gradient: 'linear-gradient(180deg, #8ba7bd 0%, #61809a 45%, #3a4d61 100%)',
    orb: 'rgba(255, 255, 255, 0.28)',
  },
  'cloudy-night': {
    gradient: 'linear-gradient(180deg, #1b2534 0%, #101827 55%, #1c1a38 100%)',
    orb: 'rgba(148, 163, 184, 0.18)',
  },
  rain: {
    gradient: 'linear-gradient(180deg, #51657a 0%, #26313f 50%, #101821 100%)',
    orb: 'rgba(125, 211, 252, 0.2)',
  },
  thunder: {
    gradient: 'linear-gradient(180deg, #40336b 0%, #211d4d 50%, #0d1024 100%)',
    orb: 'rgba(250, 204, 21, 0.22)',
  },
  snow: {
    gradient: 'linear-gradient(180deg, #a9bccd 0%, #6d8195 50%, #465a6e 100%)',
    orb: 'rgba(255, 255, 255, 0.38)',
  },
  fog: {
    gradient: 'linear-gradient(180deg, #7b8492 0%, #545c69 50%, #3b424d 100%)',
    orb: 'rgba(255, 255, 255, 0.26)',
  },
}
