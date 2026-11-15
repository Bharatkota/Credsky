// Hand-drawn SVG weather icon set (no icon-font dependency).
// Rendered with white strokes so they stay readable on every theme background.

export default function WeatherIcon({ icon, className = 'w-10 h-10', animate = true }) {
  const common = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (icon) {
    case 'sun':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.2" className={animate ? 'anim-spin-slow' : ''} style={{ transformOrigin: '12px 12px' }} />
          <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4l1.4-1.4M18 6l1.4-1.4" />
        </svg>
      )
    case 'moon':
      return (
        <svg {...common}>
          <path d="M20 13.5A8.1 8.1 0 0 1 10.5 4a7.6 7.6 0 1 0 9.5 9.5Z" />
        </svg>
      )
    case 'partly-day':
      return (
        <svg {...common}>
          <circle cx="8.5" cy="7.5" r="3" />
          <path d="M8.5 2.8v1.4M3.4 7.5h1.4M4.9 3.9l1 1M12.1 3.9l-1 1" />
          <path d="M7.5 18.5h9a3.2 3.2 0 0 0 .4-6.4 4.6 4.6 0 0 0-8.8-1 3.7 3.7 0 0 0-.6 7.4Z" fill="rgba(255,255,255,0.14)" />
        </svg>
      )
    case 'partly-night':
      return (
        <svg {...common}>
          <path d="M15 6.5a4 4 0 0 1-3.6-5.4A4.7 4.7 0 1 0 17.4 8c-.7.3-1.5.4-2.4.4Z" transform="translate(2 1)" />
          <path d="M6.5 20.5h9a3.2 3.2 0 0 0 .4-6.4 4.6 4.6 0 0 0-8.8-1 3.7 3.7 0 0 0-.6 7.4Z" fill="rgba(255,255,255,0.14)" />
        </svg>
      )
    case 'cloud':
      return (
        <svg {...common}>
          <path d="M6.5 18.5h10a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.6-1.2 4 4 0 0 0-.9 8Z" fill="rgba(255,255,255,0.14)" />
        </svg>
      )
    case 'fog':
      return (
        <svg {...common}>
          <path d="M6.5 15.5h10a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.6-1.2 4 4 0 0 0-.9 8Z" />
          <path d="M4 19h13M7 21.5h11" opacity="0.75" />
        </svg>
      )
    case 'drizzle':
      return (
        <svg {...common}>
          <path d="M6.5 14.5h10a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.6-1.2 4 4 0 0 0-.9 8Z" />
          <path d="M8 17.5v1.8M12 17.5v1.8M16 17.5v1.8" opacity="0.85" />
        </svg>
      )
    case 'rain':
      return (
        <svg {...common}>
          <path d="M6.5 13.5h10a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.6-1.2 4 4 0 0 0-.9 8Z" />
          <path d="M8 16.5l-1 3.2M12 16.5l-1 3.2M16 16.5l-1 3.2" />
        </svg>
      )
    case 'snow':
      return (
        <svg {...common}>
          <path d="M6.5 13.5h10a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.6-1.2 4 4 0 0 0-.9 8Z" />
          <path d="M8 18h.01M11 20h.01M14 18h.01M12 16h.01M16 20h.01" strokeWidth="2.4" />
        </svg>
      )
    case 'thunder':
      return (
        <svg {...common}>
          <path d="M6.5 13.5h10a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.6-1.2 4 4 0 0 0-.9 8Z" />
          <path d="M13 14.5l-3.5 4h3l-1.5 4 4.5-5.5h-3l1-2.5Z" fill="rgba(250,204,21,0.85)" stroke="rgba(250,204,21,0.9)" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path d="M6.5 18.5h10a3.4 3.4 0 0 0 .5-6.8 5 5 0 0 0-9.6-1.2 4 4 0 0 0-.9 8Z" />
        </svg>
      )
  }
}
