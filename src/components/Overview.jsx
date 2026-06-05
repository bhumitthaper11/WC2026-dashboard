import { GROUPS, CONTENDERS, TOURNAMENT } from '../data.js'

const statCards = [
  { value: '48', label: 'Teams', icon: '🌍' },
  { value: '12', label: 'Groups', icon: '📊' },
  { value: '104', label: 'Matches', icon: '⚽' },
  { value: '16', label: 'Venues', icon: '🏟️' },
  { value: '39', label: 'Days', icon: '📅' },
  { value: '3', label: 'Host Nations', icon: '🌎' },
]

const timeline = [
  { phase: 'Group Stage', dates: 'Jun 11 – Jun 27', teams: 48, icon: '📋', color: '#3b82f6' },
  { phase: 'Round of 32', dates: 'Jun 29 – Jul 3', teams: 32, icon: '⚔️', color: '#8b5cf6' },
  { phase: 'Round of 16', dates: 'Jul 5 – Jul 7', teams: 16, icon: '🥊', color: '#f59e0b' },
  { phase: 'Quarter-finals', dates: 'Jul 9 – Jul 11', teams: 8, icon: '🎯', color: '#ef4444' },
  { phase: 'Semi-finals', dates: 'Jul 14 – Jul 15', teams: 4, icon: '🔥', color: '#ec4899' },
  { phase: 'Final', dates: 'Jul 19', teams: 2, icon: '🏆', color: '#c8a84b' },
]

export default function Overview({ setTab }) {
  return (
    <div className="fade-in">
      {/* Stat grid */}
      <div style={{ marginBottom: '2.5rem' }}>
        <SectionTitle>Tournament at a Glance</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          {statCards.map(s => (
            <div key={s.label} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '1.25rem 1rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: 'var(--muted2)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tournament timeline */}
      <div style={{ marginBottom: '2.5rem' }}>
        <SectionTitle>Tournament Roadmap</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {timeline.map((phase, i) => (
            <div key={phase.phase} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.9rem 1.25rem',
              borderLeft: `3px solid ${phase.color}`,
            }}>
              <div style={{ fontSize: '1.25rem', width: 32, textAlign: 'center' }}>{phase.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{phase.phase}</div>
                <div style={{ color: 'var(--muted2)', fontSize: '0.8rem' }}>{phase.dates}</div>
              </div>
              <div style={{
                background: 'var(--bg3)', borderRadius: '20px', padding: '0.25rem 0.75rem',
                fontSize: '0.8rem', color: 'var(--muted2)', fontFamily: 'var(--font-mono)',
              }}>
                {phase.teams} teams
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top contenders preview */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <SectionTitle style={{ marginBottom: 0 }}>Top Contenders</SectionTitle>
          <button onClick={() => setTab('contenders')} style={{
            background: 'none', border: '1px solid var(--border2)',
            borderRadius: '20px', padding: '0.35rem 0.9rem',
            color: 'var(--accent)', fontSize: '0.8rem', cursor: 'pointer',
          }}>
            View all →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          {CONTENDERS.slice(0, 4).map(c => (
            <div key={c.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '1.25rem',
              position: 'relative', overflow: 'hidden',
            }}>
              {c.defending && (
                <div style={{
                  position: 'absolute', top: 10, right: 10,
                  background: 'rgba(200,168,75,0.15)', color: 'var(--accent)',
                  fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: 20,
                  border: '1px solid rgba(200,168,75,0.3)', fontWeight: 600,
                }}>
                  DEFENDING
                </div>
              )}
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{c.flag}</div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{c.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rank</div>
                  <div style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>#{c.rank}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Group</div>
                  <div style={{ color: 'var(--muted2)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{c.group}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ color: 'var(--muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Odds</div>
                  <div style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{c.odds}</div>
                </div>
              </div>
              {/* Strength bar */}
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ height: 3, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${c.strength}%`, background: c.color, borderRadius: 2 }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Groups quick view */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <SectionTitle style={{ marginBottom: 0 }}>All 12 Groups</SectionTitle>
          <button onClick={() => setTab('groups')} style={{
            background: 'none', border: '1px solid var(--border2)',
            borderRadius: '20px', padding: '0.35rem 0.9rem',
            color: 'var(--accent)', fontSize: '0.8rem', cursor: 'pointer',
          }}>
            Full standings →
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.6rem' }}>
          {GROUPS.map(g => (
            <div key={g.id} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.75rem 1rem',
              borderTop: `3px solid ${g.color}`,
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: g.color, marginBottom: '0.5rem' }}>
                GROUP {g.id}
              </div>
              {g.teams.map(t => (
                <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '0.9rem' }}>{t.flag}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted2)' }}>{t.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children, style }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)',
      fontSize: '1.4rem',
      letterSpacing: '0.05em',
      color: 'var(--text)',
      marginBottom: '1rem',
      ...style,
    }}>
      {children}
    </h2>
  )
}
