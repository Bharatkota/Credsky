# Weather Catch ⛅

> Know your weather *before* it catches you.

Weather Catch is a responsive, mobile-first web application that gives people quick, reliable weather information for everyday decisions — built from the product specification in this repository.

**Live:** deployed on Vercel (see the deployment section)

---

## Features (MVP)

| Area | Details |
| --- | --- |
| **City search** | Autocomplete geocoding with country/region disambiguation, full keyboard navigation (↑ ↓ Enter Esc), debounced requests |
| **Location detection** | "Use My Location" button; browser permission requested only after user action; reverse-geocoded place name |
| **Current weather** | Temperature, condition, feels-like, humidity, wind, pressure, visibility, cloud cover |
| **Hourly forecast** | Next 24 hours with condition icons and precipitation probability |
| **7-day forecast** | Min/max temperatures, conditions, precipitation probability, sunrise/sunset |
| **°C / °F toggle** | Pure client-side conversion — never triggers a new weather API request |
| **Saved cities** | Persisted in browser local storage, quick removal and navigation |
| **Recent searches** | Last 5 viewed locations, persisted locally |
| **Weather-responsive visuals** | Background gradients and ambient elements adapt to conditions (day/night, rain, snow, thunder, fog) |
| **Accessibility** | Lighthouse accessibility score 1.0; keyboard navigable; `prefers-reduced-motion` respected |
| **Error handling** | Offline, city-not-found, rate-limit and API-outage states with retry; missing values shown as `N/A` |

## Tech stack

- **Frontend:** React 19 + Vite
- **Styling:** Tailwind CSS 4
- **Data:** [Open-Meteo](https://open-meteo.com/) Geocoding + Forecast APIs (free, no API key), BigDataCloud reverse geocoding
- **Analytics:** Vercel Analytics + lightweight in-app event log (`window.__wcEvents`)
- **Hosting:** Vercel
- **Storage:** browser local storage only — no accounts, no server-side location data

## Privacy

- Location permission is requested **only** when the user clicks "Use My Location".
- Precise coordinates are never stored on any server; saved cities and preferences live in the browser.
- No private API credentials exist in this codebase — no keys are required at all.
- "Clear my data" in the footer wipes every stored preference and location.

## Getting started

```bash
npm install
npm run dev      # local development at http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Deployment

Deployed to Vercel (static Vite build). Any push to the connected branch triggers a new production deployment.

---

*Weather data by [Open-Meteo](https://open-meteo.com/) (CC-BY 4.0). Forecast accuracy varies by region; Weather Catch presents provider data as-is with transparent freshness timestamps.*
