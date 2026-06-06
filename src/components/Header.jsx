import { useState, useEffect } from 'react'

const TARGET = new Date('2026-06-11T19:00:00Z')
function pad(n) { return String(n).padStart(2, '0') }

export default function Header({ user }) {
  const [timeLeft, setTimeLeft] = useState({})
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now()
      if (diff <= 0) { setStarted(true); return }
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header style={{
      background: 'linear-gradient(180deg, var(--bg2) 0%, var(--bg) 100%)',
      borderBottom: '1px solid var(--border)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Animated gradient bar at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, var(--team-primary), var(--team-secondary), var(--team-primary))`,
        backgroundSize: '200% 100%',
        animation: 'bgPan 3s linear infinite',
        transition: 'background 0.8s ease',
      }} />

      {/* Dot grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '1.25rem 1.5rem',
        position: 'relative',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1rem',
      }}>
        {/* Left: title + personalized greeting */}
        <div className="slide-down">
          {user ? (
            <div style={{ marginBottom: '0.3rem', fontSize: '0.78rem', color: 'var(--muted2)', letterSpacing: '0.04em' }}>
              Welcome back, <span style={{ color: 'var(--team-primary)', fontWeight: 600 }}>{user.name}</span>
              {user.team && (
                <span> · {user.team.flag} <span style={{ color: 'var(--team-primary)' }}>{user.team.name}</span></span>
              )}
            </div>
          ) : null}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.75rem', animation: 'float 4s ease-in-out infinite' }}>⚽</span>
            <div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)',
                letterSpacing: '0.05em', lineHeight: 1,
              }}>
                {user?.name
                  ? <><span style={{ color: 'var(--muted2)', fontFamily: 'var(--font-display)' }}>{user.name.toUpperCase()}'S </span><span style={{ color: 'var(--team-primary)', transition: 'color 0.6s' }}>WC 2026</span></>
                  : <><span>FIFA WORLD CUP </span><span style={{ color: 'var(--team-primary)' }}>2026</span></>
                }
              </h1>
              <p style={{ color: 'var(--muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>
                🇺🇸 USA · 🇨🇦 Canada · 🇲🇽 Mexico &nbsp;·&nbsp; 48 teams · 104 matches
              </p>
            </div>
          </div>
        </div>

        {/* Right: countdown + team badge */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Team badge */}
          {user?.team && (
            <div className="scale-in team-card" style={{
              background: `${getTeamTheme(user.team.name).glow}`,
              borderRadius: 'var(--radius-lg)',
              padding: '0.6rem 1rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span style={{ fontSize: '1.75rem' }}>{user.team.flag}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--team-primary)', transition: 'color 0.6s' }}>
                  {user.team.name}
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '0.1rem' }}>My Team</div>
              </div>
            </div>
          )}

          {/* Countdown */}
          {started ? (
            <div style={{
              background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)',
              borderRadius: 'var(--radius-lg)', padding: '0.65rem 1.1rem',
            }}>
              <div style={{ color: 'var(--green)', fontWeight: 600, fontSize: '0.9rem' }}>🟢 Underway</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>Final: Jul 19 · MetLife</div>
            </div>
          ) : (
            <div style={{
              background: 'var(--card)', border: '1px solid var(--border2)',
              borderRadius: 'var(--radius-lg)', padding: '0.65rem 1.1rem',
            }}>
              <div style={{ color: 'var(--muted)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                Kickoff In
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                {[{ v: timeLeft.d, l: 'D' }, { v: timeLeft.h, l: 'H' }, { v: timeLeft.m, l: 'M' }, { v: timeLeft.s, l: 'S' }].map(({ v, l }) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 500, color: 'var(--team-primary)', lineHeight: 1, transition: 'color 0.6s' }}>
                      {pad(v ?? 0)}
                    </div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>{l}</div>
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

function getTeamTheme(name) {
  // Inline import to avoid circular dep in header
  const themes = {
    'Spain': { glow: 'rgba(198,11,30,0.15)' },
    'Argentina': { glow: 'rgba(116,172,223,0.15)' },
    'France': { glow: 'rgba(0,35,149,0.15)' },
    'Brazil': { glow: 'rgba(0,156,59,0.15)' },
    'England': { glow: 'rgba(207,8,31,0.15)' },
    'Germany': { glow: 'rgba(221,0,0,0.12)' },
    'Portugal': { glow: 'rgba(0,102,0,0.15)' },
    'Netherlands': { glow: 'rgba(255,79,0,0.15)' },
  }
  return themes[name] || { glow: 'rgba(200,168,75,0.1)' }
}
