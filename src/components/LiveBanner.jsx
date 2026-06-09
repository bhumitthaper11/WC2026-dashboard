import { useLiveMatches } from '../hooks.js'
import { phaseLabel } from '../api.js'
import { GROUPS } from '../data.js'

function getFlag(n) {
  for (const g of GROUPS) { const t = g.teams.find(t => t.name === n); if (t) return t.flag }
  return '🏳️'
}

export default function LiveBanner() {
  const { matches, loading, hasLive } = useLiveMatches()
  if (loading || !hasLive || !matches.length) return null

  return (
    <div style={{
      background: 'rgba(34,197,94,0.05)',
      borderBottom: '1px solid rgba(34,197,94,0.15)',
      padding: '0.5rem 1.5rem',
      backdropFilter: 'blur(20px)',
      overflowX: 'auto',
      position: 'relative', zIndex: 10,
    }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', gap:'1rem', alignItems:'center' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:'0.4rem',
          color:'#22c55e', fontWeight:700, fontSize:'0.72rem',
          letterSpacing:'0.1em', whiteSpace:'nowrap',
        }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', display:'inline-block', animation:'pulse 0.8s infinite', boxShadow:'0 0 6px #22c55e' }} />
          LIVE
        </div>
        {matches.map(m => (
          <div key={m.id} style={{
            display:'flex', alignItems:'center', gap:'0.5rem',
            background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)',
            borderRadius:8, padding:'0.3rem 0.75rem',
            fontSize:'0.8rem', whiteSpace:'nowrap', flexShrink:0,
            backdropFilter:'blur(20px)',
          }}>
            <span>{getFlag(m.home)}</span>
            <span style={{ fontFamily:'var(--font-mono)', fontWeight:700, color:'#22c55e' }}>{m.homeScore}</span>
            <span style={{ color:'rgba(255,255,255,0.2)' }}>–</span>
            <span style={{ fontFamily:'var(--font-mono)', fontWeight:700, color:'#22c55e' }}>{m.awayScore}</span>
            <span>{getFlag(m.away)}</span>
            <span style={{ fontSize:'0.68rem', color:'#22c55e', background:'rgba(34,197,94,0.1)', padding:'0.1rem 0.4rem', borderRadius:20, marginLeft:2 }}>
              {phaseLabel(m.phase)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
