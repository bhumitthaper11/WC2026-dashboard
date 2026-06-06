import { useLiveMatches } from '../hooks.js'
import { phaseLabel } from '../api.js'
import { GROUPS } from '../data.js'

function getFlag(teamName) {
  for (const g of GROUPS) {
    const t = g.teams.find(t => t.name === teamName)
    if (t) return t.flag
  }
  return '🏳️'
}

export default function LiveBanner() {
  const { matches, loading, hasLive } = useLiveMatches()

  if (loading || !hasLive || matches.length === 0) return null

  return (
    <div style={{
      background: 'rgba(34,197,94,0.06)',
      borderBottom: '1px solid rgba(34,197,94,0.2)',
      padding: '0.6rem 1.5rem',
      overflowX: 'auto',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', gap: '1.25rem', alignItems: 'center',
        flexWrap: 'nowrap',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          color: 'var(--green)', fontWeight: 600, fontSize: '0.78rem',
          whiteSpace: 'nowrap',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--green)',
            display: 'inline-block', animation: 'pulse 1s infinite',
          }} />
          LIVE NOW
        </div>
        {matches.map(m => (
          <div key={m.id} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--card)', border: '1px solid rgba(34,197,94,0.25)',
            borderRadius: 8, padding: '0.3rem 0.75rem',
            fontSize: '0.82rem', whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            <span>{getFlag(m.home)}</span>
            <span style={{ fontWeight: 600 }}>{m.homeScore}</span>
            <span style={{ color: 'var(--muted)' }}>–</span>
            <span style={{ fontWeight: 600 }}>{m.awayScore}</span>
            <span>{getFlag(m.away)}</span>
            <span style={{
              fontSize: '0.7rem', color: 'var(--green)',
              background: 'rgba(34,197,94,0.1)', padding: '0.1rem 0.4rem',
              borderRadius: 20, marginLeft: 4,
            }}>
              {phaseLabel(m.phase)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
