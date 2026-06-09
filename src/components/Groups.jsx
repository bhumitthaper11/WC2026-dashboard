import { useState } from 'react'
import { useStandings } from '../hooks.js'
import { GROUPS } from '../data.js'
import ApiStatus from './ApiStatus.jsx'

function GroupTable({ group, delay = 0 }) {
  const standings = [...group.teams].sort(
    (a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf
  )

  return (
    <div
      className="hud-corner"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid rgba(255,255,255,0.08)`,
        borderTop: `2px solid ${group.color}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        animation: `fadeUp 0.5s ${delay}s ease both`,
        boxShadow: `0 0 30px rgba(0,0,0,0.4), inset 0 0 20px rgba(${group.color},0.02)`,
      }}
    >
      {/* Header */}
      <div style={{
        padding: '0.75rem 1.25rem',
        background: `${group.color}12`,
        borderBottom: `1px solid ${group.color}22`,
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '1.5rem',
          color: group.color,
          textShadow: `0 0 15px ${group.color}`,
          letterSpacing: '0.05em',
        }}>
          GROUP {group.id}
        </span>
        <div style={{ display: 'flex', gap: '0.3rem', marginLeft: 'auto' }}>
          {group.teams.map(t => (
            <span key={t.name} style={{ fontSize: '1.1rem' }}>{t.flag}</span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['#','Team','P','W','D','L','GF','GA','GD','Pts'].map(h => (
                <th key={h} style={{
                  padding: '0.5rem 0.7rem',
                  textAlign: h === 'Team' ? 'left' : 'center',
                  color: 'rgba(255,255,255,0.3)',
                  fontWeight: 500, fontSize: '0.72rem',
                  letterSpacing: '0.08em',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((t, i) => (
              <tr key={t.name} style={{
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: i < 2 ? 'rgba(34,197,94,0.04)' : 'transparent',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = i < 2 ? 'rgba(34,197,94,0.04)' : 'transparent'}
              >
                <td style={{ padding: '0.6rem 0.7rem', textAlign: 'center' }}>
                  {i < 2
                    ? <span style={{ color: '#22c55e', fontWeight: 700 }}>{i+1}</span>
                    : i === 2
                    ? <span style={{ color: 'var(--team-primary)' }}>{i+1}</span>
                    : <span style={{ color: 'rgba(255,255,255,0.3)' }}>{i+1}</span>}
                </td>
                <td style={{ padding: '0.6rem 0.7rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.45rem' }}>
                    <span>{t.flag}</span>
                    <span style={{ fontWeight: i < 2 ? 500 : 400, color: 'rgba(255,255,255,0.85)' }}>{t.name}</span>
                  </div>
                </td>
                {[t.p, t.w, t.d, t.l, t.gf, t.ga,
                  (t.gf - t.ga >= 0 ? '+' : '') + (t.gf - t.ga)
                ].map((v, vi) => (
                  <td key={vi} style={{
                    padding: '0.6rem 0.7rem', textAlign: 'center',
                    color: 'rgba(255,255,255,0.45)',
                    fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                  }}>{v}</td>
                ))}
                <td style={{
                  padding: '0.6rem 0.7rem', textAlign: 'center',
                  fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: 'var(--team-primary)',
                  textShadow: '0 0 10px var(--team-glow)',
                }}>
                  {t.pts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {[['#22c55e','Advance (top 2)'],['var(--team-primary)','Possible 3rd']].map(([c,l]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.68rem', color:'rgba(255,255,255,0.3)' }}>
            <div style={{ width:6, height:6, borderRadius:2, background:c }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Groups() {
  const { groups, loading, error, lastUpdated, refresh } = useStandings()
  const [filter, setFilter] = useState('all')

  const display = groups || GROUPS
  const filtered = filter === 'all' ? display : display.filter(g => g.id === filter)

  return (
    <div className="fade-up">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.25rem', flexWrap:'wrap', gap:'0.75rem' }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', letterSpacing:'0.06em', color:'var(--team-primary)', textShadow:'0 0 20px var(--team-glow)' }}>
          GROUP STAGE STANDINGS
        </h2>
        <ApiStatus loading={loading} error={error} lastUpdated={lastUpdated} refresh={refresh} />
      </div>

      <div style={{ display:'flex', gap:'0.35rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
        <FilterPill active={filter==='all'} onClick={() => setFilter('all')}>All</FilterPill>
        {GROUPS.map(g => (
          <FilterPill key={g.id} active={filter===g.id} color={g.color} onClick={() => setFilter(g.id)}>{g.id}</FilterPill>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(440px,1fr))', gap:'1rem' }}>
        {filtered.map((g, i) => <GroupTable key={g.id} group={g} delay={i * 0.05} />)}
      </div>
    </div>
  )
}

function FilterPill({ children, active, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.3rem 0.75rem',
        background: active ? (color || 'var(--team-primary)') + '22' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${active ? (color || 'var(--team-primary)') : 'rgba(255,255,255,0.1)'}`,
        borderRadius: 20,
        color: active ? (color || 'var(--team-primary)') : 'rgba(255,255,255,0.45)',
        fontSize: '0.78rem', fontWeight: active ? 600 : 400,
        cursor: 'pointer', transition: 'all 0.2s',
        fontFamily: 'var(--font-body)',
        boxShadow: active ? `0 0 10px ${color || 'var(--team-primary)'}44` : 'none',
      }}
    >
      {children}
    </button>
  )
}
