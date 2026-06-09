import { useState } from 'react'

export default function ApiStatus({ loading, error, lastUpdated, refresh, hasLive }) {
  const [busy, setBusy] = useState(false)
  const doRefresh = async () => { setBusy(true); await refresh?.(); setBusy(false) }

  const base = {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.35rem 0.875rem',
    borderRadius: 20, fontSize: '0.75rem',
    backdropFilter: 'blur(20px)',
    fontFamily: 'var(--font-body)',
  }

  if (loading && !lastUpdated) return (
    <div style={{ ...base, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--team-primary)', display:'inline-block', animation:'pulse 1s infinite' }} />
      Syncing…
    </div>
  )

  if (error) return (
    <div style={{ ...base, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
      <span>⚠</span> API offline
      <button onClick={doRefresh} style={{ background:'none', border:'none', color:'#ef4444', cursor:'pointer', textDecoration:'underline', padding:0, fontFamily:'var(--font-body)', fontSize:'0.75rem' }}>Retry</button>
    </div>
  )

  return (
    <div style={{ ...base, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', color: 'rgba(255,255,255,0.35)' }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background: hasLive ? '#22c55e' : 'rgba(255,255,255,0.3)', display:'inline-block', animation: hasLive ? 'pulse 1s infinite' : 'none', boxShadow: hasLive ? '0 0 8px #22c55e' : 'none' }} />
      {hasLive ? <span style={{ color:'#22c55e', fontWeight:600 }}>Live</span> : 'Live'}
      {lastUpdated && <span>· {lastUpdated.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>}
      <button onClick={doRefresh} disabled={busy} style={{ background:'none', border:'none', color:'rgba(255,255,255,0.3)', cursor:'pointer', fontSize:'1rem', padding:'0 2px', opacity: busy ? 0.3 : 1, lineHeight:1 }}>↻</button>
    </div>
  )
}
