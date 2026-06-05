import { useState } from 'react'
import { VENUES } from '../data.js'

const countryColors = { USA: '#3b82f6', Canada: '#ef4444', Mexico: '#22c55e' }
const countryFlags = { USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽' }

export default function Venues() {
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('matches')

  const filtered = VENUES
    .filter(v => filter === 'all' || v.country === filter)
    .sort((a, b) => {
      if (sortBy === 'capacity') return b.capacity - a.capacity
      if (sortBy === 'matches') return b.matches - a.matches
      return a.name.localeCompare(b.name)
    })

  const totals = {
    USA: VENUES.filter(v => v.country === 'USA').reduce((s, v) => s + v.matches, 0),
    Canada: VENUES.filter(v => v.country === 'Canada').reduce((s, v) => s + v.matches, 0),
    Mexico: VENUES.filter(v => v.country === 'Mexico').reduce((s, v) => s + v.matches, 0),
  }

  return (
    <div className="fade-in">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
        TOURNAMENT VENUES
      </h2>

      {/* Country summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {['USA', 'Canada', 'Mexico'].map(c => (
          <div key={c} style={{
            background: 'var(--card)', border: `1px solid ${filter === c ? countryColors[c] : 'var(--border)'}`,
            borderRadius: 'var(--radius-lg)', padding: '1rem',
            cursor: 'pointer', transition: 'all 0.2s',
            borderTop: `3px solid ${countryColors[c]}`,
          }}
          onClick={() => setFilter(filter === c ? 'all' : c)}
          >
            <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{countryFlags[c]}</div>
            <div style={{ fontWeight: 500 }}>{c}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--muted)' }}>{VENUES.filter(v => v.country === c).length} venues</span>
              <span style={{ color: countryColors[c], fontFamily: 'var(--font-mono)' }}>{totals[c]} matches</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sort controls */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--muted)', marginRight: '0.25rem' }}>Sort:</span>
        {['matches', 'capacity', 'name'].map(s => (
          <button key={s} onClick={() => setSortBy(s)} style={{
            padding: '0.3rem 0.75rem',
            background: sortBy === s ? 'var(--accent)' : 'var(--card)',
            border: `1px solid ${sortBy === s ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 20, color: sortBy === s ? 'var(--bg)' : 'var(--muted2)',
            fontSize: '0.78rem', fontWeight: sortBy === s ? 600 : 400,
            cursor: 'pointer', textTransform: 'capitalize',
          }}>
            {s}
          </button>
        ))}
      </div>

      {/* Venue cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.875rem' }}>
        {filtered.map(v => (
          <div key={v.name} style={{
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '1.25rem',
            position: 'relative', overflow: 'hidden',
            borderLeft: `3px solid ${countryColors[v.country]}`,
          }}>
            {v.final && (
              <div style={{
                position: 'absolute', top: 12, right: 12,
                background: 'rgba(200,168,75,0.15)', color: 'var(--accent)',
                fontSize: '0.65rem', fontWeight: 600,
                padding: '0.2rem 0.5rem', borderRadius: 20,
                border: '1px solid rgba(200,168,75,0.3)',
              }}>
                🏆 FINAL
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.875rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{countryFlags[v.country]}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.3 }}>{v.name}</div>
                <div style={{ color: 'var(--muted2)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{v.city}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <Stat label="Capacity" value={v.capacity.toLocaleString()} color={countryColors[v.country]} />
              <Stat label="Matches" value={v.matches} color={countryColors[v.country]} />
            </div>

            {/* Capacity bar */}
            <div style={{ marginTop: '0.75rem' }}>
              <div style={{ height: 3, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(v.capacity / 92542) * 100}%`,
                  background: countryColors[v.country],
                  borderRadius: 2,
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>Capacity</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>{Math.round((v.capacity / 92542) * 100)}% of max</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Stat({ label, value, color }) {
  return (
    <div style={{
      background: 'var(--bg3)', borderRadius: 'var(--radius)',
      padding: '0.5rem 0.75rem',
    }}>
      <div style={{ fontSize: '0.68rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', color, fontWeight: 500, fontSize: '1rem', marginTop: '0.15rem' }}>{value}</div>
    </div>
  )
}
