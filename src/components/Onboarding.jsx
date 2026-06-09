import { useState, useEffect, useRef } from 'react'
import { GROUPS } from '../data.js'
import { getTeamTheme } from '../teamThemes.js'

const ALL_TEAMS = GROUPS.flatMap(g =>
  g.teams.map(t => ({ ...t, group: g.id, groupColor: g.color }))
)

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [celebrating, setCelebrating] = useState(false)
  const [confetti, setConfetti] = useState([])
  const canvasRef = useRef(null)

  const filtered = ALL_TEAMS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const theme = selected ? getTeamTheme(selected.name) : { primary: '#c8a84b', secondary: '#e8c96d', r: 200, g: 168, b: 75 }

  // Confetti burst on celebration
  useEffect(() => {
    if (!celebrating) return
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: 40 + Math.random() * 20,
      y: 30 + Math.random() * 20,
      vx: (Math.random() - 0.5) * 14,
      vy: -6 - Math.random() * 8,
      color: [theme.primary, theme.secondary, '#ffffff', '#ffdd00', '#ff6b6b'][i % 5],
      size: 5 + Math.random() * 8,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }))
    setConfetti(pieces)
    const t = setTimeout(() => onComplete({ name, team: selected }), 2600)
    return () => clearTimeout(t)
  }, [celebrating])

  // Confetti canvas animation
  useEffect(() => {
    if (!confetti.length) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    let pieces = confetti.map(p => ({ ...p }))
    let rafId

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pieces = pieces.map(p => ({
        ...p,
        x: p.x + p.vx * 0.5,
        y: p.y + p.vy * 0.5,
        vy: p.vy + 0.25,
        rot: p.rot + p.rotV,
        vx: p.vx * 0.99,
      }))
      for (const p of pieces) {
        const px = (p.x / 100) * canvas.width
        const py = (p.y / 100) * canvas.height
        ctx.save()
        ctx.translate(px, py)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, 1 - p.y / 120)
        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }
        ctx.restore()
      }
      rafId = requestAnimationFrame(tick)
    }
    tick()
    return () => cancelAnimationFrame(rafId)
  }, [confetti])

  const r = theme.r, g = theme.g, b = theme.b

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      background: '#04060f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Animated orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${r},${g},${b},0.12) 0%, transparent 65%)`,
          top: '-20%', left: '-15%',
          animation: 'float 7s ease-in-out infinite',
          transition: 'background 1s ease',
        }} />
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${r},${g},${b},0.09) 0%, transparent 65%)`,
          bottom: '-15%', right: '-10%',
          animation: 'float 9s ease-in-out infinite reverse',
          transition: 'background 1s ease',
        }} />
        {/* Grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(${r},${g},${b},0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(${r},${g},${b},0.04) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(${r},${g},${b},0.4), transparent)`,
          animation: 'scanline 4s linear infinite',
        }} />
      </div>

      {/* Confetti canvas */}
      {celebrating && (
        <canvas ref={canvasRef} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none',
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 500, padding: '1.5rem' }}>

        {/* ── STEP 0: NAME ─────────────────────────────────── */}
        {step === 0 && (
          <div style={{ textAlign: 'center', animation: 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div style={{ fontSize: '4.5rem', animation: 'float 3s ease-in-out infinite', marginBottom: '1rem', filter: `drop-shadow(0 0 20px rgba(${r},${g},${b},0.5))` }}>
              ⚽
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 9vw, 5rem)',
              letterSpacing: '0.06em', lineHeight: 0.95,
              marginBottom: '0.5rem',
            }}>
              <span style={{ color: '#fff' }}>FIFA</span><br />
              <span style={{
                color: theme.primary,
                textShadow: `0 0 30px rgba(${r},${g},${b},0.8), 0 0 80px rgba(${r},${g},${b},0.4)`,
                transition: 'all 0.8s ease',
              }}>WORLD CUP</span><br />
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '80%' }}>2026</span>
            </h1>

            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', marginBottom: '2.5rem', letterSpacing: '0.06em' }}>
              USA · CANADA · MEXICO
            </p>

            <div style={{
              background: `rgba(${r},${g},${b},0.06)`,
              border: `1px solid rgba(${r},${g},${b},0.2)`,
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              backdropFilter: 'blur(40px)',
              boxShadow: `0 0 40px rgba(${r},${g},${b},0.1)`,
            }}>
              <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>
                Identify Yourself
              </p>
              <input
                autoFocus
                type="text"
                placeholder="Enter your name…"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(1)}
                style={{
                  width: '100%', padding: '0.875rem 1.125rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${name ? `rgba(${r},${g},${b},0.5)` : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 'var(--radius)',
                  color: '#fff', fontSize: '1.05rem',
                  fontFamily: 'var(--font-body)', outline: 'none',
                  marginBottom: '1rem',
                  transition: 'border-color 0.3s',
                  boxShadow: name ? `0 0 15px rgba(${r},${g},${b},0.15)` : 'none',
                }}
              />
              <button
                onClick={() => name.trim() && setStep(1)}
                disabled={!name.trim()}
                style={{
                  width: '100%', padding: '0.875rem',
                  background: name.trim()
                    ? `linear-gradient(135deg, rgba(${r},${g},${b},0.9), rgba(${r},${g},${b},0.6))`
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${name.trim() ? `rgba(${r},${g},${b},0.6)` : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 'var(--radius)',
                  color: name.trim() ? '#fff' : 'rgba(255,255,255,0.25)',
                  fontSize: '0.9rem', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  cursor: name.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                  fontFamily: 'var(--font-body)',
                  boxShadow: name.trim() ? `0 0 20px rgba(${r},${g},${b},0.3)` : 'none',
                }}
              >
                INITIALISE →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 1: TEAM ─────────────────────────────────── */}
        {step === 1 && (
          <div style={{ animation: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                letterSpacing: '0.05em',
                lineHeight: 1,
              }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>AGENT </span>
                <span style={{ color: theme.primary, textShadow: `0 0 20px rgba(${r},${g},${b},0.7)` }}>
                  {name.toUpperCase()}
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.82rem', marginTop: '0.5rem', letterSpacing: '0.06em' }}>
                SELECT YOUR NATION
              </p>
            </div>

            <div style={{
              background: `rgba(${r},${g},${b},0.05)`,
              border: `1px solid rgba(${r},${g},${b},0.18)`,
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              backdropFilter: 'blur(40px)',
              boxShadow: `0 0 40px rgba(${r},${g},${b},0.08)`,
            }}>
              <div style={{ padding: '0.875rem', borderBottom: `1px solid rgba(${r},${g},${b},0.1)` }}>
                <input
                  autoFocus
                  type="text"
                  placeholder="🔍  Search nation…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '0.65rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius)',
                    color: '#fff', fontSize: '0.88rem',
                    fontFamily: 'var(--font-body)', outline: 'none',
                  }}
                />
              </div>

              <div style={{
                maxHeight: 380, overflowY: 'auto',
                display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
                gap: '0.4rem', padding: '0.6rem',
              }}>
                {filtered.map((team, i) => {
                  const tt = getTeamTheme(team.name)
                  const isSelected = selected?.name === team.name
                  return (
                    <button
                      key={team.name}
                      onClick={() => { setSelected(team); setTimeout(() => setCelebrating(true), 250) }}
                      style={{
                        background: isSelected
                          ? `rgba(${tt.r},${tt.g},${tt.b},0.18)`
                          : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isSelected ? `rgba(${tt.r},${tt.g},${tt.b},0.5)` : 'rgba(255,255,255,0.07)'}`,
                        borderRadius: 'var(--radius)',
                        padding: '0.6rem 0.75rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s',
                        animation: `fadeUp 0.35s ${Math.min(i * 0.025, 0.4)}s both`,
                        boxShadow: isSelected ? `0 0 15px rgba(${tt.r},${tt.g},${tt.b},0.2)` : 'none',
                        fontFamily: 'var(--font-body)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = `0 8px 20px rgba(${tt.r},${tt.g},${tt.b},0.2)`
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = ''
                        e.currentTarget.style.boxShadow = isSelected ? `0 0 15px rgba(${tt.r},${tt.g},${tt.b},0.2)` : 'none'
                      }}
                    >
                      <span style={{ fontSize: '1.35rem' }}>{team.flag}</span>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 500, color: isSelected ? tt.primary : 'rgba(255,255,255,0.8)', lineHeight: 1.2 }}>
                          {team.name}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: team.groupColor, fontWeight: 600, marginTop: 1 }}>GRP {team.group}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: CELEBRATE ────────────────────────────── */}
        {celebrating && selected && (
          <div style={{ textAlign: 'center', animation: 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div style={{
              fontSize: '6rem', marginBottom: '1rem',
              animation: 'float 1.2s ease-in-out infinite',
              filter: `drop-shadow(0 0 30px rgba(${r},${g},${b},0.8))`,
            }}>
              {selected.flag}
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 7vw, 3.5rem)',
              letterSpacing: '0.05em', lineHeight: 1.1,
              color: '#fff',
            }}>
              LET'S GO<br />
              <span style={{
                color: theme.primary,
                textShadow: `0 0 30px rgba(${r},${g},${b},0.9), 0 0 80px rgba(${r},${g},${b},0.5)`,
              }}>
                {name.toUpperCase()}!
              </span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
              Supporting <strong style={{ color: theme.primary }}>{selected.name}</strong> 🏆
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%', background: theme.primary,
                  animation: `pulse 0.7s ${i * 0.18}s ease-in-out infinite`,
                  boxShadow: `0 0 8px ${theme.primary}`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
