import { useState, useEffect } from 'react'
import { GROUPS } from '../data.js'
import { getTeamTheme } from '../teamThemes.js'

const ALL_TEAMS = GROUPS.flatMap(g => g.teams.map(t => ({ ...t, group: g.id, groupColor: g.color })))

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0) // 0=name, 1=team, 2=celebrating
  const [name, setName] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [particles, setParticles] = useState([])

  const filtered = ALL_TEAMS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  )

  const theme = selected ? getTeamTheme(selected.name) : { primary: '#c8a84b', secondary: '#e8c96d', glow: 'rgba(200,168,75,0.2)' }

  // Generate celebration particles
  useEffect(() => {
    if (step === 2) {
      const arr = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 10,
        delay: Math.random() * 1.2,
        duration: 1.5 + Math.random() * 1.5,
        color: [theme.primary, theme.secondary, '#ffffff', '#c8a84b'][Math.floor(Math.random() * 4)],
      }))
      setParticles(arr)
      const t = setTimeout(() => onComplete({ name, team: selected }), 2800)
      return () => clearTimeout(t)
    }
  }, [step])

  const handleNameNext = () => { if (name.trim()) setStep(1) }
  const handleTeamSelect = (team) => {
    setSelected(team)
    setTimeout(() => setStep(2), 200)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
      overflow: 'hidden',
    }}>
      {/* Animated bg orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', width: 600, height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          top: '-20%', left: '-10%',
          animation: 'float 6s ease-in-out infinite',
          transition: 'background 0.8s ease',
        }} />
        <div style={{
          position: 'absolute', width: 500, height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          bottom: '-15%', right: '-5%',
          animation: 'float 8s ease-in-out infinite reverse',
          transition: 'background 0.8s ease',
        }} />
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Celebration particles */}
      {step === 2 && particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          background: p.color,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          animation: `fadeUp ${p.duration}s ${p.delay}s ease-out both`,
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 480, padding: '1.5rem' }}>

        {/* ── STEP 0: Name ── */}
        {step === 0 && (
          <div className="fade-up" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', animation: 'float 3s ease-in-out infinite' }}>⚽</div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              letterSpacing: '0.06em', lineHeight: 1, marginBottom: '0.5rem',
              background: `linear-gradient(135deg, #ffffff 0%, ${theme.primary} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              transition: 'all 0.6s ease',
            }}>
              FIFA WORLD CUP
            </h1>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 10vw, 5.5rem)', color: theme.primary, lineHeight: 1, marginBottom: '2rem', transition: 'color 0.6s ease' }}>
              2026
            </div>
            <p style={{ color: 'var(--muted2)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              USA · Canada · Mexico &nbsp;·&nbsp; June 11 – July 19
            </p>

            <div style={{
              background: 'var(--card)', border: '1px solid var(--border2)',
              borderRadius: 'var(--radius-lg)', padding: '2rem',
              boxShadow: `0 20px 60px rgba(0,0,0,0.4)`,
            }}>
              <p style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '1.25rem', color: 'var(--muted2)' }}>
                What's your name?
              </p>
              <input
                autoFocus
                type="text"
                placeholder="Enter your name…"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleNameNext()}
                style={{
                  width: '100%', padding: '0.875rem 1.125rem',
                  background: 'var(--bg3)', border: `2px solid ${name ? theme.primary : 'var(--border2)'}`,
                  borderRadius: 'var(--radius)', color: 'var(--text)',
                  fontSize: '1.05rem', fontFamily: 'var(--font-body)',
                  outline: 'none', transition: 'border-color 0.3s ease',
                  marginBottom: '1rem',
                }}
              />
              <button
                onClick={handleNameNext}
                disabled={!name.trim()}
                style={{
                  width: '100%', padding: '0.875rem',
                  background: name.trim()
                    ? `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`
                    : 'var(--bg3)',
                  border: 'none', borderRadius: 'var(--radius)',
                  color: name.trim() ? '#000' : 'var(--muted)',
                  fontSize: '1rem', fontWeight: 600,
                  cursor: name.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.03em',
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 1: Team ── */}
        {step === 1 && (
          <div className="fade-up">
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', letterSpacing: '0.05em', color: 'var(--text)' }}>
                Hey, <span style={{ color: theme.primary }}>{name}</span>!
              </div>
              <p style={{ color: 'var(--muted2)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
                Which team are you rooting for?
              </p>
            </div>

            <div style={{
              background: 'var(--card)', border: '1px solid var(--border2)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            }}>
              {/* Search */}
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                <input
                  autoFocus
                  type="text"
                  placeholder="🔍  Search team…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    width: '100%', padding: '0.7rem 1rem',
                    background: 'var(--bg3)', border: '1px solid var(--border2)',
                    borderRadius: 'var(--radius)', color: 'var(--text)',
                    fontSize: '0.9rem', fontFamily: 'var(--font-body)', outline: 'none',
                  }}
                />
              </div>

              {/* Team grid */}
              <div style={{
                maxHeight: 340, overflowY: 'auto',
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem', padding: '0.75rem',
              }}>
                {filtered.map((team, i) => {
                  const tTheme = getTeamTheme(team.name)
                  return (
                    <button
                      key={team.name}
                      onClick={() => handleTeamSelect(team)}
                      className="lift"
                      style={{
                        background: selected?.name === team.name ? `${tTheme.primary}22` : 'var(--bg3)',
                        border: `1px solid ${selected?.name === team.name ? tTheme.primary : 'var(--border)'}`,
                        borderRadius: 'var(--radius)',
                        padding: '0.6rem 0.75rem',
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s ease',
                        animation: `fadeUp 0.4s ${Math.min(i * 0.03, 0.5)}s both`,
                      }}
                    >
                      <span style={{ fontSize: '1.4rem' }}>{team.flag}</span>
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.2 }}>{team.name}</div>
                        <div style={{ fontSize: '0.68rem', color: team.groupColor, fontWeight: 600 }}>Group {team.group}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 2: Celebration ── */}
        {step === 2 && selected && (
          <div className="scale-in" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1rem', animation: 'float 1.5s ease-in-out infinite' }}>
              {selected.flag}
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.8rem, 6vw, 3rem)',
              letterSpacing: '0.04em', lineHeight: 1.2, marginBottom: '0.5rem',
              color: 'var(--text)',
            }}>
              LET'S GO,<br />
              <span style={{ color: theme.primary }}>{name.toUpperCase()}!</span>
            </h2>
            <p style={{ color: 'var(--muted2)', fontSize: '1rem', marginTop: '0.75rem' }}>
              Supporting <strong style={{ color: theme.primary }}>{selected.name}</strong> 🏆
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: theme.primary,
                  animation: `pulse 0.8s ${i * 0.2}s ease-in-out infinite`,
                }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
