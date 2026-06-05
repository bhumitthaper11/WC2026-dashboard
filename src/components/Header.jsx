import { useState, useEffect } from 'react'

const TARGET = new Date('2026-06-11T19:00:00Z')

function pad(n) { return String(n).padStart(2, '0') }

export default function Header() {
  const [timeLeft, setTimeLeft] = useState({})
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now()
      if (diff <= 0) { setStarted(true); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ d, h, m, s })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header style={{
      background: 'var(--bg2)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Decorative background pattern */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem',
        position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '1.5rem',
      }}>
        {/* Title */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
            <span style={{ fontSize: '2rem' }}>⚽</span>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '0.04em',
              color: 'var(--text)',
              lineHeight: 1,
            }}>
              FIFA WORLD CUP <span style={{ color: 'var(--accent)' }}>2026</span>
            </h1>
          </div>
          <p style={{ color: 'var(--muted2)', fontSize: '0.875rem', fontWeight: 300 }}>
            🇺🇸 USA · 🇨🇦 Canada · 🇲🇽 Mexico &nbsp;·&nbsp; 48 teams · 104 matches · 16 venues
          </p>
        </div>

        {/* Countdown */}
        <div style={{ textAlign: 'center' }}>
          {started ? (
            <div style={{
              background: 'var(--card2)', border: '1px solid var(--border2)',
              borderRadius: 'var(--radius-lg)', padding: '0.75rem 1.5rem',
            }}>
              <div style={{ color: 'var(--green)', fontWeight: 600, fontSize: '1rem' }}>
                🟢 Tournament Underway
              </div>
              <div style={{ color: 'var(--muted2)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                Final: July 19 · MetLife Stadium
              </div>
            </div>
          ) : (
            <div style={{
              background: 'var(--card2)', border: '1px solid var(--border2)',
              borderRadius: 'var(--radius-lg)', padding: '0.75rem 1.25rem',
            }}>
              <div style={{ color: 'var(--muted2)', fontSize: '0.7rem', letterSpacing: '0.1em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Kickoff Countdown
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                {[
                  { v: timeLeft.d, l: 'Days' },
                  { v: timeLeft.h, l: 'Hrs' },
                  { v: timeLeft.m, l: 'Min' },
                  { v: timeLeft.s, l: 'Sec' },
                ].map(({ v, l }) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 500,
                      color: 'var(--accent)', lineHeight: 1,
                    }}>
                      {pad(v ?? 0)}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 2 }}>
                      {l}
                    </div>
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
