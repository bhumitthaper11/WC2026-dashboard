import { useState } from 'react'
import { GROUPS } from '../data.js'

function calcStandings(teams, matches) {
  const table = teams.map(t => ({ ...t }))
  matches.forEach(m => {
    if (m.homeScore === null || m.awayScore === null) return
    const home = table.find(t => t.name === m.home)
    const away = table.find(t => t.name === m.away)
    if (!home || !away) return
    home.p++; away.p++
    home.gf += m.homeScore; home.ga += m.awayScore
    away.gf += m.awayScore; away.ga += m.homeScore
    if (m.homeScore > m.awayScore) { home.w++; away.l++; home.pts += 3 }
    else if (m.homeScore < m.awayScore) { away.w++; home.l++; away.pts += 3 }
    else { home.d++; away.d++; home.pts++; away.pts++ }
  })
  return table.sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga) || b.gf - a.gf)
}

function GroupTable({ group }) {
  const [matches, setMatches] = useState(group.matches.map(m => ({ ...m })))
  const standings = calcStandings(group.teams, matches)
  const [editIdx, setEditIdx] = useState(null)

  const updateScore = (idx, field, val) => {
    const updated = matches.map((m, i) => i === idx ? { ...m, [field]: val === '' ? null : parseInt(val) } : m)
    setMatches(updated)
  }

  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      borderTop: `3px solid ${group.color}`,
    }}>
      {/* Group header */}
      <div style={{
        padding: '0.875rem 1.25rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        borderBottom: '1px solid var(--border)',
        background: 'var(--card2)',
      }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: '1.4rem',
          color: group.color, lineHeight: 1,
        }}>
          GROUP {group.id}
        </span>
        <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>
          {group.teams.map(t => t.flag).join('  ')}
        </span>
      </div>

      {/* Standings table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['#', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'].map(h => (
                <th key={h} style={{
                  padding: '0.5rem 0.75rem', color: 'var(--muted)',
                  fontWeight: 500, fontSize: '0.75rem',
                  textAlign: h === 'Team' ? 'left' : 'center',
                  letterSpacing: '0.05em',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {standings.map((team, i) => (
              <tr key={team.name} style={{
                borderBottom: '1px solid var(--border)',
                background: i < 2 ? 'rgba(34,197,94,0.04)' : 'transparent',
              }}>
                <td style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--muted)' }}>
                  {i < 2 ? (
                    <span style={{ color: 'var(--green)', fontWeight: 600 }}>{i + 1}</span>
                  ) : i === 2 ? (
                    <span style={{ color: 'var(--accent)' }}>{i + 1}</span>
                  ) : <span>{i + 1}</span>}
                </td>
                <td style={{ padding: '0.6rem 0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>{team.flag}</span>
                    <span style={{ fontWeight: i < 2 ? 500 : 400 }}>{team.name}</span>
                  </div>
                </td>
                {[team.p, team.w, team.d, team.l, team.gf, team.ga,
                  (team.gf - team.ga > 0 ? '+' : '') + (team.gf - team.ga)].map((v, vi) => (
                  <td key={vi} style={{ padding: '0.6rem 0.75rem', textAlign: 'center', color: 'var(--muted2)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    {v}
                  </td>
                ))}
                <td style={{
                  padding: '0.6rem 0.75rem', textAlign: 'center',
                  fontWeight: 600, color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                }}>
                  {team.pts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Qualification legend */}
      <div style={{ padding: '0.5rem 1rem', display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)' }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--green)' }} /> Advance (top 2)
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--muted)' }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--accent)' }} /> Possible 3rd
        </div>
      </div>

      {/* Matches */}
      <div style={{ borderTop: '1px solid var(--border)', padding: '0.75rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.5rem', paddingLeft: '0.25rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Fixtures — click score to edit
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {matches.map((m, idx) => (
            <div key={idx} style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--bg3)',
              borderRadius: 'var(--radius)',
              padding: '0.5rem 0.75rem',
              fontSize: '0.82rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                <span style={{ color: 'var(--muted2)' }}>{m.home}</span>
                <span>{group.teams.find(t => t.name === m.home)?.flag}</span>
              </div>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                onClick={() => setEditIdx(editIdx === idx ? null : idx)}
              >
                {editIdx === idx ? (
                  <>
                    <input
                      type="number" min="0" max="20"
                      value={m.homeScore ?? ''}
                      onChange={e => updateScore(idx, 'homeScore', e.target.value)}
                      onClick={e => e.stopPropagation()}
                      style={{
                        width: 36, textAlign: 'center',
                        background: 'var(--card)', border: '1px solid var(--accent)',
                        borderRadius: 4, color: 'var(--text)',
                        fontFamily: 'var(--font-mono)', fontSize: '0.85rem', padding: '2px 4px',
                      }}
                    />
                    <span style={{ color: 'var(--muted)' }}>–</span>
                    <input
                      type="number" min="0" max="20"
                      value={m.awayScore ?? ''}
                      onChange={e => updateScore(idx, 'awayScore', e.target.value)}
                      onClick={e => e.stopPropagation()}
                      style={{
                        width: 36, textAlign: 'center',
                        background: 'var(--card)', border: '1px solid var(--accent)',
                        borderRadius: 4, color: 'var(--text)',
                        fontFamily: 'var(--font-mono)', fontSize: '0.85rem', padding: '2px 4px',
                      }}
                    />
                  </>
                ) : (
                  <div style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 6, padding: '0.2rem 0.6rem',
                    fontFamily: 'var(--font-mono)', fontSize: '0.9rem',
                    color: m.homeScore !== null ? 'var(--text)' : 'var(--muted)',
                    minWidth: 52, textAlign: 'center',
                  }}>
                    {m.homeScore !== null ? `${m.homeScore} – ${m.awayScore}` : m.date}
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>{group.teams.find(t => t.name === m.away)?.flag}</span>
                <span style={{ color: 'var(--muted2)' }}>{m.away}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Groups() {
  const [filter, setFilter] = useState('all')
  const groups = filter === 'all' ? GROUPS : GROUPS.filter(g => g.id === filter)

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.05em' }}>
          GROUP STAGE STANDINGS
        </h2>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          <FilterBtn active={filter === 'all'} onClick={() => setFilter('all')}>All Groups</FilterBtn>
          {GROUPS.map(g => (
            <FilterBtn key={g.id} active={filter === g.id} color={filter === g.id ? g.color : undefined} onClick={() => setFilter(g.id)}>
              {g.id}
            </FilterBtn>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: '1.25rem' }}>
        {groups.map(g => <GroupTable key={g.id} group={g} />)}
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
      fontSize: '0.8rem', fontWeight: active ? 600 : 400,
      cursor: 'pointer', transition: 'all 0.15s',
    }}>
      {children}
    </button>
  )
}
