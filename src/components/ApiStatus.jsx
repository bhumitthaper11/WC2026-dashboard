import { useState } from 'react'

export default function ApiStatus({ loading, error, lastUpdated, refresh, hasLive }) {
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refresh()
    setRefreshing(false)
  }

  if (loading && !lastUpdated) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem 0.875rem', background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 20, fontSize: '0.78rem', color: 'var(--muted2)',
      }}>
        <span style={{ animation: 'pulse 1.5s infinite', display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
        Fetching live data…
      </div>
    )
  }

  if (error) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.4rem 0.875rem', background: 'rgba(239,68,68,0.08)',
        border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20,
        fontSize: '0.78rem', color: '#ef4444',
      }}>
        <span>⚠</span>
        <span>API unavailable — showing cached data</span>
        <button onClick={handleRefresh} style={{
          background: 'none', border: 'none', color: '#ef4444',
          cursor: 'pointer', fontSize: '0.78rem', textDecoration: 'underline', padding: 0,
        }}>Retry</button>
      </div>
    )
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      padding: '0.4rem 0.875rem', background: 'var(--card)',
      border: '1px solid var(--border)', borderRadius: 20,
      fontSize: '0.78rem', color: 'var(--muted)',
    }}>
      <span style={{
        display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
        background: hasLive ? '#22c55e' : 'var(--muted)',
        animation: hasLive ? 'pulse 1.5s infinite' : 'none',
      }} />
      {hasLive ? <span style={{ color: 'var(--green)', fontWeight: 500 }}>Live</span> : 'Live data'}
      {lastUpdated && (
        <span>· {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      )}
      <button
        onClick={handleRefresh}
        disabled={refreshing}
        style={{
          background: 'none', border: 'none', color: 'var(--muted)',
          cursor: 'pointer', fontSize: '0.85rem', padding: '0 2px',
          opacity: refreshing ? 0.4 : 1, lineHeight: 1,
        }}
        title="Refresh"
      >
        {refreshing ? '…' : '↻'}
      </button>
    </div>
  )
}
