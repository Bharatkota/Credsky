// A small walking Minion mascot (FR-08: weather-responsive visual experience).
// Its attire and accessories change with the current weather theme:
//   clear day   → sunglasses + straw hat
//   clear night → nightcap + lantern
//   cloudy      → hoodie
//   rain/thunder→ raincoat + umbrella
//   snow        → beanie + scarf + mittens
//   fog         → lantern
// Purely decorative: aria-hidden, pointer-events none, CSS-driven walk,
// and effectively disabled under prefers-reduced-motion.

function Attire({ themeKey }) {
  const a = {
    sunglasses: themeKey === 'clear-day',
    sunhat: themeKey === 'clear-day',
    nightcap: themeKey === 'clear-night',
    lantern: themeKey === 'clear-night' || themeKey === 'fog',
    hoodie: themeKey === 'cloudy-day' || themeKey === 'cloudy-night',
    raincoat: themeKey === 'rain' || themeKey === 'thunder',
    umbrella: themeKey === 'rain' || themeKey === 'thunder',
    beanie: themeKey === 'snow',
    scarf: themeKey === 'snow',
  }
  return (
    <>
      {/* Raincoat (torso overlay) */}
      {a.raincoat && (
        <>
          <path d="M28 36 h44 v40 a22 22 0 0 1 -44 0 z" fill="#EA7317" opacity="0.97" />
          <path d="M30 36 a20 18 0 0 1 40 0" fill="none" stroke="#EA7317" strokeWidth="6" strokeLinecap="round" />
          <line x1="50" y1="42" x2="50" y2="82" stroke="#F8D7B0" strokeWidth="1.6" strokeDasharray="3 3" />
        </>
      )}

      {/* Hoodie (hood rim + drawstrings) */}
      {a.hoodie && (
        <>
          <path d="M30 35 a20 17 0 0 1 40 0" fill="none" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          <line x1="44" y1="58" x2="44" y2="66" stroke="#E2E8F0" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="56" y1="58" x2="56" y2="66" stroke="#E2E8F0" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="44" cy="67" r="1.4" fill="#CBD5E1" />
          <circle cx="56" cy="67" r="1.4" fill="#CBD5E1" />
        </>
      )}

      {/* Scarf */}
      {a.scarf && (
        <>
          <rect x="36" y="55" width="28" height="6" rx="3" fill="#E74C3C" />
          <rect x="58" y="58" width="7" height="15" rx="3" fill="#C0392B" />
        </>
      )}

      {/* Straw sun hat */}
      {a.sunhat && (
        <>
          <ellipse cx="50" cy="29" rx="23" ry="5" fill="#EACD8A" stroke="#C9A24B" strokeWidth="1" />
          <path d="M33 28 a17 12 0 0 1 34 0 z" fill="#EACD8A" />
          <rect x="34" y="24" width="32" height="4.5" rx="2" fill="#C0392B" />
        </>
      )}

      {/* Sunglasses over the goggle */}
      {a.sunglasses && (
        <>
          <rect x="36" y="37" width="28" height="9" rx="4.5" fill="#111827" opacity="0.92" />
          <line x1="36" y1="41" x2="30" y2="39" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
          <circle cx="44" cy="41.5" r="1.4" fill="#4B5563" />
          <circle cx="56" cy="41.5" r="1.4" fill="#4B5563" />
        </>
      )}

      {/* Nightcap */}
      {a.nightcap && (
        <>
          <path d="M33 29 Q44 8 60 10 Q66 12 67 28 Z" fill="#DC2626" />
          <rect x="32" y="26" width="36" height="5.5" rx="2.7" fill="#F87171" />
          <circle cx="61" cy="9" r="3.2" fill="#F8FAFC" />
        </>
      )}

      {/* Winter beanie */}
      {a.beanie && (
        <>
          <path d="M33 29 a17 14 0 0 1 34 0 v1 z" fill="#2E86C1" />
          <rect x="31" y="27" width="38" height="6.5" rx="3.2" fill="#1B4F72" />
          <circle cx="50" cy="14" r="3.6" fill="#F8FAFC" />
        </>
      )}

      {/* Held accessories */}
      {a.umbrella && (
        <>
          <line x1="71" y1="12" x2="71" y2="62" stroke="#7C4A21" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M49 34 Q71 8 93 34 Q87 30 81 34 Q76 30 71 34 Q66 30 61 34 Q55 30 49 34 Z" fill="#EF4444" />
          <line x1="71" y1="12" x2="71" y2="9" stroke="#7C4A21" strokeWidth="2.4" strokeLinecap="round" />
        </>
      )}
      {a.lantern && (
        <>
          <circle cx="83" cy="70" r="10" fill="rgba(250,204,21,0.30)" />
          <line x1="79" y1="72" x2="83" y2="65" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="79" y="65" width="9" height="11" rx="2.5" fill="#F4B63F" stroke="#92400E" strokeWidth="1.2" />
          <circle cx="83.5" cy="70.5" r="2" fill="#FDE68A" />
        </>
      )}
    </>
  )
}

export default function Minion({ themeKey }) {
  const mitten = themeKey === 'snow'
  const handFill = mitten ? '#DC2626' : '#F6D544'
  const plain = !themeKey

  return (
    <div aria-hidden className="minion-walker">
      <svg viewBox="0 0 100 120" width="56" height="67" className="minion-bob">
        {/* legs + feet */}
        <rect x="41" y="88" width="7" height="12" rx="3" fill="#1F2937" />
        <rect x="52" y="88" width="7" height="12" rx="3" fill="#1F2937" />
        <ellipse cx="42" cy="102" rx="7.5" ry="3.5" fill="#111827" />
        <ellipse cx="57" cy="102" rx="7.5" ry="3.5" fill="#111827" />

        {/* body capsule */}
        <rect x="30" y="26" width="40" height="66" rx="20" fill="#F6D544" />

        {/* hair (hidden under most hats) */}
        <path d="M44 27 L42 20.5 M50 26.5 L50 20 M56 27 L58 20.5" stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round" fill="none" />

        {/* back arm */}
        <path d="M31 62 q-9 3 -8 12" stroke="#F6D544" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <circle cx="23.5" cy="74.5" r="3.2" fill={handFill} />

        <Attire themeKey={themeKey} />

        {/* overalls (skip when raincoat covers the torso) */}
        {!plain && themeKey !== 'rain' && themeKey !== 'thunder' && (
          <>
            <path d="M31 64 h38 v12 a19 19 0 0 1 -38 0 z" fill="#3B6EA5" />
            <rect x="40" y="56" width="20" height="9" rx="2" fill="#3B6EA5" />
            <line x1="42" y1="57" x2="39" y2="42" stroke="#3B6EA5" strokeWidth="3" strokeLinecap="round" />
            <line x1="58" y1="57" x2="61" y2="42" stroke="#3B6EA5" strokeWidth="3" strokeLinecap="round" />
            <circle cx="42.5" cy="58.5" r="1.3" fill="#F6D544" />
            <circle cx="57.5" cy="58.5" r="1.3" fill="#F6D544" />
          </>
        )}

        {/* goggle strap + goggle + eye */}
        <rect x="30" y="41" width="40" height="5" fill="#374151" />
        <circle cx="50" cy="43" r="10" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" />
        <circle cx="50" cy="43" r="6" fill="#FFFFFF" />
        <circle cx="51" cy="43" r="3" fill="#8B5A2B" />
        <circle cx="51.6" cy="43" r="1.5" fill="#111827" />
        <circle cx="49.4" cy="41.6" r="0.9" fill="#FFFFFF" />

        {/* mouth */}
        <path d="M45 55 q5 4.5 10 0" stroke="#7C2D12" strokeWidth="1.7" fill="none" strokeLinecap="round" />

        {/* front arm */}
        <path d="M69 62 q8 2 9 9" stroke="#F6D544" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <circle cx="78.5" cy="71.5" r="3.2" fill={handFill} />
      </svg>
    </div>
  )
}
