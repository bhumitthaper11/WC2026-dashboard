import { useState, useMemo } from 'react'
import { GROUPS } from '../data.js'

const allMatches = GROUPS.flatMap(g =>
  g.matches.map(m => ({ ...m, group: g.id, groupColor: g.color,
    homeFlag: g.teams.find(t => t.name === m.home)?.flag,
    awayFlag: g.teams.find(t => t.name === m.away)?.flag,
  }))
)

const allDates = [...new Set(allMatches.map(m => m.date))].sort()

export default function Schedule() {
  const [groupFilter, setGroupFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [showPlayed, setShowPlayed] = useState(true)

  const filtered = useMemo(() => {
    return allMatches.filter(m => {
      if (groupFilter !== 'all' && m.group !== groupFilter) return false
      if (!showPlayed && m.homeScore !== null) return false
      if (search) {
        const q = search.toLowerCase()
        if (!m.home.toLowerCase().includes(q) && !m.away.toLowerCase().includes(q) && !m.venue.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [groupFilter, search, showPlayed])

  // Group by date
  const byDate = useMemo(() => {
    const map = {}
    filtered.forEach(m => {
      if (!map[m.date]) map[m.date] = []
      map[m.date].push(m)
    })
    return map
  }, [filtered])

  const dates = Object.keys(byDate).sort()

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.05em' }}>
          FULL SCHEDULE
        </h2>
        <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
          {filtered.length} matches
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search team or venue…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border2)',
            borderRadius: 'var(--radius)', padding: '0.5rem 0.875rem',
            color: 'var(--text)', fontSize: '0.85rem', minWidth: 200,
            fontFamily: 'var(--font-body)',
            outline: 'none',
          }}
        />
        <select
          value={groupFilter}
          onChange={e => setGroupFilter(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border2)',
            borderRadius: 'var(--radius)', padding: '0.5rem 0.875rem',
            color: 'var(--muted2)', fontSize: '0.85rem',
            fontFamily: 'var(--font-body)', cursor: 'pointer',
          }}
        >
          <option value="all">All Groups</option>
          {GROUPS.map(g => <option key={g.id} value={g.id}>Group {g.id}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--muted2)' }}>
          <input type="checkbox" checked={showPlayed} onChange={e => setShowPlayed(e.target.checked)} />
          Show played
        </label>
      </div>

      {dates.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem', fontSize: '0.9rem' }}>
          No matches found
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {dates.map(date => (
            <div key={date}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                  color: 'var(--accent)', letterSpacing: '0.05em',
                }}>
                  {date}
                </div>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                  {byDate[date].length} match{byDate[date].length !== 1 ? 'es' : ''}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {byDate[date].map((m, i) => (
                  <MatchRow key={i} match={m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function MatchRow({ match: m }) {
  const played = m.homeScore !== null
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '0.75rem 1rem',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr auto',
      alignItems: 'center',
      gap: '0.75rem',
      borderLeft: `3px solid ${m.groupColor}`,
    }}>
      {/* Home team */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: played && m.homeScore > m.awayScore ? 600 : 400, color: played && m.homeScore > m.awayScore ? 'var(--text)' : 'var(--muted2)' }}>
          {m.home}
        </span>
        <span style={{ fontSize: '1.25rem' }}>{m.homeFlag}</span>
      </div>

      {/* Score */}
      <div style={{
        background: played ? 'var(--bg3)' : 'transparent',
        border: played ? '1px solid var(--border)' : 'none',
        borderRadius: 8,
        padding: played ? '0.3rem 0.75rem' : '0.3rem 0.25rem',
        fontFamily: 'var(--font-mono)',
        fontSize: played ? '1rem' : '0.8rem',
        fontWeight: 500,
        color: played ? 'var(--text)' : 'var(--muted)',
        textAlign: 'center',
        minWidth: played ? 56 : 'auto',
      }}>
        {played ? `${m.homeScore} – ${m.awayScore}` : m.time}
      </div>

      {/* Away team */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>{m.awayFlag}</span>
        <span style={{ fontSize: '0.9rem', fontWeight: played && m.awayScore > m.homeScore ? 600 : 400, color: played && m.awayScore > m.homeScore ? 'var(--text)' : 'var(--muted2)' }}>
          {m.away}
        </span>
      </div>

      {/* Venue / Group badge */}
      <div style={{ textAlign: 'right' }}>
        <div style={{
          display: 'inline-block',
          background: `${m.groupColor}22`,
          color: m.groupColor,
          fontSize: '0.68rem', padding: '0.15rem 0.5rem',
          borderRadius: 20, fontWeight: 600,
          marginBottom: '0.2rem',
        }}>
          GRP {m.group}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>
          {m.venue}
        </div>
      </div>
    </div>
  )
}
