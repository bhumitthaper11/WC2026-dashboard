import { useState, useMemo } from 'react'
import { useAllMatches } from '../hooks.js'
import { GROUPS } from '../data.js'
import ApiStatus from './ApiStatus.jsx'
import { phaseLabel } from '../api.js'

function getGroupColor(groupId) {
  return GROUPS.find(g => g.id === groupId)?.color || 'var(--muted)'
}

function getFlag(teamName) {
  for (const g of GROUPS) {
    const t = g.teams.find(t => t.name === teamName)
    if (t) return t.flag
  }
  return '🏳️'
}

function MatchRow({ m }) {
  const played = m.finished || m.live
  const homeWin = played && m.homeScore > m.awayScore
  const awayWin = played && m.awayScore > m.homeScore
  const groupColor = getGroupColor(m.group)

  return (
    <div style={{
      background: 'var(--card)', border: `1px solid ${m.live ? 'rgba(34,197,94,0.3)' : 'var(--border)'}`,
      borderRadius: 'var(--radius)', padding: '0.75rem 1rem',
      display: 'grid', gridTemplateColumns: '1fr auto 1fr auto',
      alignItems: 'center', gap: '0.75rem',
      borderLeft: `3px solid ${m.live ? '#22c55e' : groupColor}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: homeWin ? 600 : 400, color: homeWin ? 'var(--text)' : 'var(--muted2)' }}>{m.home}</span>
        <span style={{ fontSize: '1.25rem' }}>{getFlag(m.home)}</span>
      </div>

      <div style={{ textAlign: 'center' }}>
        {played ? (
          <div style={{
            background: 'var(--bg3)', border: '1px solid var(--border)',
            borderRadius: 8, padding: '0.3rem 0.75rem',
            fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 500, minWidth: 56,
          }}>
            {m.homeScore} – {m.awayScore}
          </div>
        ) : (
          <div style={{ color: 'var(--muted)', fontSize: '0.8rem', textAlign: 'center' }}>{m.time}</div>
        )}
        {m.live && (
          <div style={{ fontSize: '0.68rem', color: 'var(--green)', marginTop: 3, fontWeight: 600 }}>
            {phaseLabel(m.phase)}
          </div>
        )}
        {m.finished && (
          <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: 3 }}>FT</div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem' }}>{getFlag(m.away)}</span>
        <span style={{ fontSize: '0.9rem', fontWeight: awayWin ? 600 : 400, color: awayWin ? 'var(--text)' : 'var(--muted2)' }}>{m.away}</span>
      </div>

      <div style={{ textAlign: 'right' }}>
        <div style={{
          display: 'inline-block',
          background: `${groupColor}22`, color: groupColor,
          fontSize: '0.68rem', padding: '0.15rem 0.5rem',
          borderRadius: 20, fontWeight: 600, marginBottom: '0.2rem',
        }}>GRP {m.group}</div>
        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {m.venue}
        </div>
      </div>
    </div>
  )
}

export default function Schedule() {
  const [groupFilter, setGroupFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data: matches, loading, error, lastUpdated, refresh } = useAllMatches()

  const filtered = useMemo(() => {
    if (!matches) return []
    return matches.filter(m => {
      if (groupFilter !== 'all' && m.group !== groupFilter) return false
      if (statusFilter === 'live' && !m.live) return false
      if (statusFilter === 'finished' && !m.finished) return false
      if (statusFilter === 'upcoming' && (m.live || m.finished)) return false
      if (search) {
        const q = search.toLowerCase()
        if (!m.home.toLowerCase().includes(q) && !m.away.toLowerCase().includes(q) && !m.venue.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [matches, groupFilter, search, statusFilter])

  const byDate = useMemo(() => {
    const map = {}
    filtered.forEach(m => {
      const key = m.date
      if (!map[key]) map[key] = []
      map[key].push(m)
    })
    return map
  }, [filtered])

  const dates = Object.keys(byDate).sort((a, b) => {
    const da = filtered.find(m => m.date === a)?.kickoff
    const db = filtered.find(m => m.date === b)?.kickoff
    if (da && db) return da - db
    return 0
  })

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.05em' }}>
          FULL SCHEDULE
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{filtered.length} matches</span>
          <ApiStatus loading={loading} error={error} lastUpdated={lastUpdated} refresh={refresh} />
        </div>
      </div>

      {/* Filters row */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text" placeholder="Search team or venue…" value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 'var(--radius)',
            padding: '0.5rem 0.875rem', color: 'var(--text)', fontSize: '0.85rem', minWidth: 200,
            fontFamily: 'var(--font-body)', outline: 'none',
          }}
        />
        <select value={groupFilter} onChange={e => setGroupFilter(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 'var(--radius)',
            padding: '0.5rem 0.875rem', color: 'var(--muted2)', fontSize: '0.85rem',
            fontFamily: 'var(--font-body)', cursor: 'pointer',
          }}>
          <option value="all">All Groups</option>
          {GROUPS.map(g => <option key={g.id} value={g.id}>Group {g.id}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          style={{
            background: 'var(--card)', border: '1px solid var(--border2)', borderRadius: 'var(--radius)',
            padding: '0.5rem 0.875rem', color: 'var(--muted2)', fontSize: '0.85rem',
            fontFamily: 'var(--font-body)', cursor: 'pointer',
          }}>
          <option value="all">All matches</option>
          <option value="live">🔴 Live now</option>
          <option value="upcoming">Upcoming</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      {loading && !matches && (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem', fontSize: '0.9rem' }}>
          Loading schedule…
        </div>
      )}

      {dates.length === 0 && !loading && (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '3rem', fontSize: '0.9rem' }}>
          No matches found
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {dates.map(date => (
          <div key={date}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--accent)', letterSpacing: '0.05em' }}>
                {date}
              </div>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>{byDate[date].length} match{byDate[date].length !== 1 ? 'es' : ''}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {byDate[date].map(m => <MatchRow key={m.id} m={m} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
