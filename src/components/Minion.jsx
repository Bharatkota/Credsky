// A Minion mascot that lives next to the temperature reading (FR-08).
// It reacts to the weather AND the feels-like temperature:
//   rain            → dances with the umbrella
//   thunder         → cowers under the umbrella, trembling
//   snow / cold ≤10°→ shivers in beanie + scarf + mittens
//   clear day ≥32°  → wipes sweat, dripping
//   clear day warm  → happy in sunglasses + straw hat
//   clear night     → fishes a star out of the sky with a rod
//   fog             → holds a lantern
//   cloudy          → hood up, gentle idle sway
// Decorative only: aria-hidden, pointer-events none, CSS-driven motion,
// and effectively disabled under prefers-reduced-motion.

export default function Minion({ themeKey, feelsLike }) {
  const hot = feelsLike != null && feelsLike >= 32
  const cold = feelsLike != null && feelsLike <= 10

  const action =
    themeKey === 'rain' ? 'dance'
    : themeKey === 'thunder' ? 'cower'
    : themeKey === 'snow' || cold ? 'shiver'
    : themeKey === 'clear-day' && hot ? 'sweat'
    : themeKey === 'clear-day' ? 'happy'
    : themeKey === 'clear-night' ? 'fish'
    : themeKey === 'fog' ? 'lantern'
    : 'idle'

  const attire = {
    sunglasses: themeKey === 'clear-day',
    sunhat: themeKey === 'clear-day',
    nightcap: themeKey === 'clear-night',
    hoodie: themeKey === 'cloudy-day' || themeKey === 'cloudy-night',
    raincoat: themeKey === 'rain' || themeKey === 'thunder',
    umbrella: themeKey === 'rain' || themeKey === 'thunder',
    beanie: themeKey === 'snow' || cold,
    scarf: themeKey === 'snow' || cold,
    lantern: themeKey === 'fog',
    rod: action === 'fish',
    sweat: action === 'sweat',
  }
  const handFill = attire.beanie ? '#DC2626' : '#F6D544'
  const coat = attire.raincoat

  const svgAnim =
    action === 'shiver' ? 'minion-shiver'
    : action === 'dance' ? 'minion-dance'
    : action === 'cower' ? 'minion-cower'
    : ''

  // ---- Arms per action ----
  const arms = (() => {
    if (action === 'fish') {
      return {
        back: { d: 'M31 62 q-9 3 -8 12', hand: [23.5, 74.5] },
        front: { d: 'M69 60 q10 0 12 -8', hand: [81, 52] },
      }
    }
    if (action === 'sweat') {
      return {
        back: { d: 'M31 62 q-9 3 -8 12', hand: [23.5, 74.5] },
        front: { d: 'M69 60 Q78 50 62 38', hand: [62, 38] },
      }
    }
    if (action === 'dance') {
      return {
        back: { d: 'M31 62 q-10 -6 -6 -14', hand: [25, 48] },
        front: { d: 'M69 62 q10 -6 6 -14', hand: [75, 48] },
      }
    }
    return {
      back: { d: 'M31 62 q-9 3 -8 12', hand: [23.5, 74.5] },
      front: { d: 'M69 62 q8 2 9 9', hand: [78.5, 71.5] },
    }
  })()

  const mouth =
    action === 'shiver' || action === 'cower' ? (
      <path d="M44 55.5 l3 -2.2 3 2.2 3 -2.2 3 2.2" stroke="#7C2D12" strokeWidth="1.7" fill="none" strokeLinecap="round" />
    ) : action === 'sweat' || action === 'dance' ? (
      <>
        <ellipse cx="50" cy="55" rx="3.4" ry="4.2" fill="#7C2D12" />
        <rect x="48.7" y="57.5" width="2.6" height="4.2" rx="1.3" fill="#F472B6" />
      </>
    ) : (
      <path d="M45 53.5 q5 4.5 10 0" stroke="#7C2D12" strokeWidth="1.7" fill="none" strokeLinecap="round" />
    )

  return (
    <div aria-hidden className="minion-roam relative inline-block shrink-0 pointer-events-none select-none">
      <div className="minion-bob">
        <svg
          viewBox="0 0 112 120"
          className={`h-auto w-16 sm:w-24 lg:w-28 ${svgAnim}`}
          style={action === 'cower' ? { transformOrigin: '50% 100%' } : undefined}
        >
          {/* ground shadow */}
          <ellipse cx="52" cy="107" rx="20" ry="3.4" fill="rgba(0,0,0,0.22)" />

          {/* legs + feet */}
          <rect x="41" y="88" width="7" height="12" rx="3" fill={coat ? '#EA7317' : '#1F2937'} />
          <rect x="52" y="88" width="7" height="12" rx="3" fill={coat ? '#EA7317' : '#1F2937'} />
          <ellipse cx="42" cy="102" rx="7.5" ry="3.5" fill="#111827" />
          <ellipse cx="57" cy="102" rx="7.5" ry="3.5" fill="#111827" />

          {/* body capsule */}
          <rect x="30" y="26" width="40" height="66" rx="20" fill="#F6D544" />

          {/* hair */}
          <path d="M44 27 L42 20.5 M50 26.5 L50 20 M56 27 L58 20.5" stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round" fill="none" />

          {/* back arm */}
          <path d={arms.back.d} stroke={coat ? '#EA7317' : '#F6D544'} strokeWidth="5.5" strokeLinecap="round" fill="none" />

          {/* ---- attire: torso layers ---- */}
          {coat && (
            <>
              <path d="M28 36 h44 v40 a22 22 0 0 1 -44 0 z" fill="#EA7317" opacity="0.97" />
              <line x1="50" y1="42" x2="50" y2="82" stroke="#F8D7B0" strokeWidth="1.6" strokeDasharray="3 3" />
            </>
          )}
          {attire.hoodie && (
            <>
              <line x1="44" y1="58" x2="44" y2="66" stroke="#E2E8F0" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="56" y1="58" x2="56" y2="66" stroke="#E2E8F0" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="44" cy="67" r="1.4" fill="#CBD5E1" />
              <circle cx="56" cy="67" r="1.4" fill="#CBD5E1" />
            </>
          )}
          {!coat && (
            <>
              <path d="M31 64 h38 v12 a19 19 0 0 1 -38 0 z" fill="#3B6EA5" />
              <rect x="40" y="56" width="20" height="9" rx="2" fill="#3B6EA5" />
              <line x1="42" y1="57" x2="39" y2="42" stroke="#3B6EA5" strokeWidth="3" strokeLinecap="round" />
              <line x1="58" y1="57" x2="61" y2="42" stroke="#3B6EA5" strokeWidth="3" strokeLinecap="round" />
              <circle cx="42.5" cy="58.5" r="1.3" fill="#F6D544" />
              <circle cx="57.5" cy="58.5" r="1.3" fill="#F6D544" />
            </>
          )}

          {/* scarf */}
          {attire.scarf && (
            <>
              <rect x="36" y="55" width="28" height="6" rx="3" fill="#E74C3C" />
              <rect x="58" y="58" width="7" height="15" rx="3" fill="#C0392B" />
            </>
          )}

          {/* headwear drawn behind the goggle where needed */}
          {attire.hoodie && (
            <path d="M30 35 a20 17 0 0 1 40 0" fill="none" stroke="#94A3B8" strokeWidth="6" strokeLinecap="round" />
          )}
          {attire.sunhat && (
            <>
              <ellipse cx="50" cy="29" rx="23" ry="5" fill="#EACD8A" stroke="#C9A24B" strokeWidth="1" />
              <path d="M33 28 a17 12 0 0 1 34 0 z" fill="#EACD8A" />
              <rect x="34" y="24" width="32" height="4.5" rx="2" fill="#C0392B" />
            </>
          )}
          {attire.nightcap && (
            <>
              <path d="M33 29 Q44 8 60 10 Q66 12 67 28 Z" fill="#DC2626" />
              <rect x="32" y="26" width="36" height="5.5" rx="2.7" fill="#F87171" />
              <circle cx="61" cy="9" r="3.2" fill="#F8FAFC" />
            </>
          )}
          {attire.beanie && (
            <>
              <path d="M33 29 a17 14 0 0 1 34 0 v1 z" fill="#2E86C1" />
              <rect x="31" y="27" width="38" height="6.5" rx="3.2" fill="#1B4F72" />
              <circle cx="50" cy="14" r="3.6" fill="#F8FAFC" />
            </>
          )}

          {/* goggle strap + goggle + eye */}
          <rect x="30" y="41" width="40" height="5" fill="#374151" />
          <circle cx="50" cy="43" r="10" fill="#E5E7EB" stroke="#6B7280" strokeWidth="2" />
          <circle cx="50" cy="43" r="6" fill="#FFFFFF" />
          <circle cx="51" cy="43" r="3" fill="#8B5A2B" />
          <circle cx="51.6" cy="43" r="1.5" fill="#111827" />
          <circle cx="49.4" cy="41.6" r="0.9" fill="#FFFFFF" />

          {/* sunglasses */}
          {attire.sunglasses && (
            <>
              <rect x="36" y="37" width="28" height="9" rx="4.5" fill="#111827" opacity="0.92" />
              <line x1="36" y1="41" x2="30" y2="39" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
              <circle cx="44" cy="41.5" r="1.4" fill="#4B5563" />
              <circle cx="56" cy="41.5" r="1.4" fill="#4B5563" />
            </>
          )}

          {/* mouth / expression */}
          {mouth}

          {/* front arm */}
          <path d={arms.front.d} stroke={coat ? '#EA7317' : '#F6D544'} strokeWidth="5.5" strokeLinecap="round" fill="none" />
          <circle cx={arms.front.hand[0]} cy={arms.front.hand[1]} r="3.2" fill={handFill} />
          <circle cx={arms.back.hand[0]} cy={arms.back.hand[1]} r="3.2" fill={handFill} />

          {/* ---- held accessories ---- */}

          {/* umbrella (tilted with the walking grip, vertical while dancing) */}
          {attire.umbrella && (() => {
            const dancing = action === 'dance'
            const cx = dancing ? 75 : 71
            const stickTop = dancing ? 16 : 12
            const stickBottom = dancing ? 52 : 70
            return (
              <>
                <line x1={cx} y1={stickTop} x2={dancing ? cx : 78} y2={stickBottom} stroke="#7C4A21" strokeWidth="2.4" strokeLinecap="round" />
                <path
                  d={`M${cx - 22} 34 Q${cx} 8 ${cx + 22} 34 Q${cx + 16} 30 ${cx + 10} 34 Q${cx + 5} 30 ${cx} 34 Q${cx - 5} 30 ${cx - 10} 34 Q${cx - 16} 30 ${cx - 22} 34 Z`}
                  fill="#EF4444"
                />
                <line x1={cx} y1={stickTop} x2={cx} y2={stickTop - 3} stroke="#7C4A21" strokeWidth="2.4" strokeLinecap="round" />
              </>
            )
          })()}

          {/* lantern */}
          {attire.lantern && (
            <>
              <circle cx="83" cy="70" r="10" fill="rgba(250,204,21,0.30)" />
              <line x1={arms.front.hand[0]} y1={arms.front.hand[1]} x2="83" y2="65" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
              <rect x="79" y="65" width="9" height="11" rx="2.5" fill="#F4B63F" stroke="#92400E" strokeWidth="1.2" />
              <circle cx="83.5" cy="70.5" r="2" fill="#FDE68A" />
            </>
          )}

          {/* fishing rod pulling a star out of the night sky */}
          {attire.rod && (
            <>
              <line x1={arms.front.hand[0]} y1={arms.front.hand[1]} x2="97" y2="28" stroke="#8B5A2B" strokeWidth="2.2" strokeLinecap="round" />
              <g className="anim-star" style={{ transformBox: 'view-box', transformOrigin: '97px 28px' }}>
                <path d="M97 28 q5 13 2 24" fill="none" stroke="#E2E8F0" strokeWidth="1.2" />
                <path d="M99 50 l1.3 2.8 3.1 0.4 -2.3 2 0.6 3 -2.7 -1.5 -2.7 1.5 0.6 -3 -2.3 -2 3.1 -0.4 z" fill="#FDE047" stroke="#FACC15" strokeWidth="0.8" />
              </g>
            </>
          )}

          {/* flying sweat drops */}
          {attire.sweat && (
            <>
              <path className="anim-sweat" d="M74 26 q3 4.5 0 7 q-3 -2.5 0 -7" fill="#7DD3FC" />
              <path className="anim-sweat" style={{ animationDelay: '0.5s' }} d="M80 33 q2.5 3.8 0 6 q-2.5 -2.2 0 -6" fill="#7DD3FC" />
              <path className="anim-sweat" style={{ animationDelay: '1s' }} d="M70 22 q2.5 3.8 0 6 q-2.5 -2.2 0 -6" fill="#7DD3FC" />
            </>
          )}
        </svg>
      </div>
    </div>
  )
}
