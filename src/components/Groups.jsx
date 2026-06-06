import { useState } from 'react'
import { useStandings } from '../hooks.js'
import { GROUPS } from '../data.js'
import ApiStatus from './ApiStatus.jsx'

function GroupTable({ group }) {
  const standings = [...group.teams].sort(
    (a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf
  )

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      borderTop: `3px solid ${group.color}`,
    }}>
      <div style={{
        padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
        borderBottom: '1px solid var(--border)', background: 'var(--card2)',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: group.color }}>
          GROUP {group.id}
        </span>
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
          {group.teams.map(t => t.flag).join('  ')}
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['#', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'].map(h => (
                <th key={h} style={{
                  padding: '0.5rem 0.75rem', color: 'var(--muted)', fontWeight: 500,
                  fontSize: '0.75rem', textAlign: h === 'Team' ? 'left' : 'center',
                  letterSpacing: '0.05em',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((team, i) => (
              <tr key={team.name} style={{
                borderBottom: '1px solid var(--border)',
                background: i < 2 ? 'rgba(34,197,94,0.04)' : 'transparent',
              }}>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center' }}>
                  {i < 2 ? <span style={{ color: 'var(--green)', fontWeight: 600 }}>{i + 1}</span>
                    : i === 2 ? <span style={{ color: 'var(--accent)' }}>{i + 1}</span>
                    : <span style={{ color: 'var(--muted)' }}>{i + 1}</span>}
                </td>
                <td style={{ padding: '0.6rem 0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{team.flag}</span>
                    <span style={{ fontWeight: i < 2 ? 500 : 400 }}>{team.name}</span>
                  </div>
                </td>
                {[team.p, team.w, team.d, team.l, team.gf, team.ga,
                  (team.gf - team.ga > 0 ? '+' : '') + (team.gf - team.ga)
                ].map((v, vi) => (
                  <td key={vi} style={{
                    padding: '0.6rem 0.75rem', textAlign: 'center',
                    color: 'var(--muted2)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                  }}>{v}</td>
                ))}
                <td style={{
                  padding: '0.6rem 0.75rem', textAlign: 'center',
                  fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-mono)',
                }}>{team.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)' }}>
        <Legend color="var(--green)" label="Advance (top 2)" />
        <Legend color="var(--accent)" label="Possible 3rd" />
      </div>
    </div>
  )
}

function Legend({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)' }}>
      <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
      {label}
    </div>
  )
}

export default function Groups() {
  const { groups, loading, error, lastUpdated, refresh } = useStandings()
  const [filter, setFilter] = useState('all')

  const displayGroups = groups || GROUPS
  const filtered = filter === 'all' ? displayGroups : displayGroups.filter(g => g.id === filter)

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.05em' }}>
          GROUP STAGE STANDINGS
        </h2>
        <ApiStatus loading={loading} error={error} lastUpdated={lastUpdated} refresh={refresh} />
      </div>

      {/* Group filter pills */}
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>All Groups</FilterBtn>
        {GROUPS.map(g => (
          <FilterBtn key={g.id} active={filter === g.id} color={filter === g.id ? g.color : undefined} onClick={() => setFilter(g.id)}>
            {g.id}
          </FilterBtn>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(g => <GroupTable key={g.id} group={g} />)}
      </div>
    </div>
  )
}

function FilterBtn({ children, active, color, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '0.35rem 0.75rem',
      background: active ? (color || 'var(--accent)') : 'var(--card)',
      border: `1px solid ${active ? (color || 'var(--accent)') : 'var(--border)'}`,
      borderRadius: '20px', color: active ? (color ? '#fff' : 'var(--bg)') : 'var(--muted2)',
      fontSize: '0.8rem', fontWeight: active ? 600 : 400, cursor: 'pointer', transition: 'all 0.15s',
    }}>{children}</button>
  )
}
