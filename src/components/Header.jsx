import { useState, useEffect, useRef } from 'react'

const TARGET = new Date('2026-06-11T19:00:00Z')
function pad(n) { return String(n).padStart(2,'0') }

export default function Header({ user, theme }) {
  const [left, setLeft] = useState({})
  const [started, setStarted] = useState(false)
  const [mouseX, setMouseX] = useState(0.5)
  const headerRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      const d = TARGET - Date.now()
      if (d <= 0) { setStarted(true); return }
      setLeft({
        d: Math.floor(d / 86400000),
        h: Math.floor((d % 86400000) / 3600000),
        m: Math.floor((d % 3600000) / 60000),
        s: Math.floor((d % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const onMouseMove = (e) => {
    const rect = headerRef.current?.getBoundingClientRect()
    if (rect) setMouseX((e.clientX - rect.left) / rect.width)
  }

  const p = theme?.primary || '#c8a84b'
  const s = theme?.secondary || '#e8c96d'
  const r = theme?.r ?? 200
  const g = theme?.g ?? 168
  const b = theme?.b ?? 75

  return (
    <header
      ref={headerRef}
      onMouseMove={onMouseMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        background: `rgba(4,6,15,0.7)`,
        borderBottom: `1px solid rgba(${r},${g},${b},0.2)`,
      }}
    >
      {/* Animated top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${p}, ${s}, ${p}, transparent)`,
        backgroundSize: '200% 100%',
        animation: 'bgPan 2.5s linear infinite',
      }} />

      {/* Parallax inner glow that follows mouse */}
      <div style={{
        position: 'absolute',
        width: 500, height: 200,
        borderRadius: '50%',
        background: `radial-gradient(ellipse, rgba(${r},${g},${b},0.12) 0%, transparent 70%)`,
        top: '-50%',
        left: `calc(${mouseX * 100}% - 250px)`,
        transition: 'left 0.4s ease',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '1.25rem 1.5rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
        position: 'relative', zIndex: 1,
      }}>

        {/* Title block */}
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          {user?.name && (
            <div style={{
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '0.3rem',
              color: `rgba(${r},${g},${b},0.7)`,
            }}>
              {user.team?.flag} Welcome,&nbsp;
              <span style={{ color: p, fontWeight: 700 }}>{user.name}</span>
            </div>
          )}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem,3.5vw,2.6rem)',
            letterSpacing: '0.06em',
            lineHeight: 1,
            color: '#fff',
          }}>
            {user?.name
              ? <>{user.name.toUpperCase()}&apos;S <span style={{
                  color: p,
                  textShadow: `0 0 20px rgba(${r},${g},${b},0.6), 0 0 60px rgba(${r},${g},${b},0.3)`,
                  transition: 'color 0.8s, text-shadow 0.8s',
                }}>WC 2026</span></>
              : <>FIFA <span style={{
                  color: p,
                  textShadow: `0 0 20px rgba(${r},${g},${b},0.6)`,
                }}>WORLD CUP 2026</span></>
            }
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
            🇺🇸 USA · 🇨🇦 Canada · 🇲🇽 Mexico &nbsp;·&nbsp; 48 teams · 104 matches
          </p>
        </div>

        {/* Right side: team badge + countdown */}
        <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', flexWrap: 'wrap' }}>

          {/* Team badge */}
          {user?.team && (
            <div style={{
              background: `rgba(${r},${g},${b},0.1)`,
              border: `1px solid rgba(${r},${g},${b},0.35)`,
              borderRadius: 'var(--radius-lg)',
              padding: '0.6rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              boxShadow: `0 0 20px rgba(${r},${g},${b},0.15), inset 0 0 20px rgba(${r},${g},${b},0.05)`,
              animation: 'teamGlow 3s ease-in-out infinite, fadeUp 0.7s 0.2s ease both',
              backdropFilter: 'blur(20px)',
            }}>
              <span style={{ fontSize: '2rem', animation: 'float 4s ease-in-out infinite' }}>{user.team.flag}</span>
              <div>
                <div style={{
                  fontWeight: 700, fontSize: '0.85rem',
                  color: p,
                  textShadow: `0 0 12px rgba(${r},${g},${b},0.6)`,
                  transition: 'color 0.6s, text-shadow 0.6s',
                }}>
                  {user.team.name}
                </div>
                <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>
                  MY TEAM
                </div>
              </div>
            </div>
          )}

          {/* Countdown */}
          {started ? (
            <div style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.65rem 1.1rem',
              backdropFilter: 'blur(20px)',
              animation: 'fadeUp 0.7s 0.3s ease both',
            }}>
              <div style={{ color: '#22c55e', fontWeight: 600, fontSize: '0.88rem' }}>🟢 LIVE</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.68rem', marginTop: 2 }}>Final Jul 19 · MetLife</div>
            </div>
          ) : (
            <div style={{
              background: `rgba(${r},${g},${b},0.07)`,
              border: `1px solid rgba(${r},${g},${b},0.2)`,
              borderRadius: 'var(--radius-lg)',
              padding: '0.65rem 1.25rem',
              backdropFilter: 'blur(20px)',
              animation: 'fadeUp 0.7s 0.3s ease both',
            }}>
              <div style={{
                fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)', marginBottom: '0.45rem',
              }}>
                Kickoff In
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {[{ v: left.d, l: 'D' }, { v: left.h, l: 'H' }, { v: left.m, l: 'M' }, { v: left.s, l: 'S' }].map(({ v, l }) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.5rem', fontWeight: 500, lineHeight: 1,
                      color: p,
                      textShadow: `0 0 15px rgba(${r},${g},${b},0.7)`,
                      transition: 'color 0.8s, text-shadow 0.8s',
                    }}>
                      {pad(v ?? 0)}
                    </div>
                    <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
