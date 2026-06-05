export default function Bracket() {
  return (
    <div className="fade-in">
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.05em', marginBottom: '1.5rem' }}>
        KNOCKOUT BRACKET
      </h2>

      {/* Format info */}
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', padding: '1.25rem',
        marginBottom: '1.5rem',
        borderLeft: '3px solid var(--accent)',
      }}>
        <div style={{ fontWeight: 500, marginBottom: '0.5rem', color: 'var(--accent)' }}>
          New Expanded Knockout Format
        </div>
        <p style={{ color: 'var(--muted2)', fontSize: '0.875rem', lineHeight: 1.7 }}>
          For the first time, 32 teams advance from the group stage — all 12 group winners, all 12 runners-up,
          and the 8 best third-placed teams. This creates a brand-new Round of 32 before the traditional Round of 16.
        </p>
      </div>

      {/* Bracket stages visual */}
      <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', minWidth: 700, alignItems: 'flex-start' }}>
          {[
            { stage: 'Round of 32', date: 'Jun 29 – Jul 3', slots: 16, color: '#3b82f6', note: '32 teams' },
            { stage: 'Round of 16', date: 'Jul 5 – Jul 7', slots: 8, color: '#8b5cf6', note: '16 teams' },
            { stage: 'Quarter-finals', date: 'Jul 9 – Jul 11', slots: 4, color: '#f59e0b', note: '8 teams' },
            { stage: 'Semi-finals', date: 'Jul 14 – 15', slots: 2, color: '#ef4444', note: '4 teams' },
            { stage: 'Final', date: 'Jul 19', slots: 1, color: '#c8a84b', note: '2 teams' },
          ].map(phase => (
            <div key={phase.stage} style={{ flex: 1, minWidth: 120 }}>
              {/* Column header */}
              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', padding: '0.6rem 0.75rem',
                marginBottom: '0.75rem', textAlign: 'center',
                borderTop: `3px solid ${phase.color}`,
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: phase.color }}>{phase.stage}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{phase.date}</div>
              </div>

              {/* Match slots */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {Array.from({ length: phase.slots }).map((_, i) => (
                  <div key={i} style={{
                    background: 'var(--card2)', border: '1px solid var(--border)',
                    borderRadius: 6, padding: '0.5rem 0.6rem',
                    minHeight: phase.stage === 'Final' ? 80 : 56,
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    gap: 4,
                  }}>
                    <div style={{
                      height: 20, background: 'var(--bg3)', borderRadius: 4,
                      display: 'flex', alignItems: 'center', paddingLeft: 6,
                    }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontStyle: 'italic' }}>TBD</span>
                    </div>
                    <div style={{ height: '1px', background: 'var(--border)', margin: '2px 0' }} />
                    <div style={{
                      height: 20, background: 'var(--bg3)', borderRadius: 4,
                      display: 'flex', alignItems: 'center', paddingLeft: 6,
                    }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontStyle: 'italic' }}>TBD</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two pathways explanation */}
      <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <PathwayCard
          title="Pathway A"
          teams={['Spain (H)', 'France (I)', 'England (L)', 'Brazil (C)']}
          color="#3b82f6"
          note="Top-ranked teams in this path"
        />
        <PathwayCard
          title="Pathway B"
          teams={['Argentina (J)', 'Portugal (K)', 'Germany (E)', 'Netherlands (F)']}
          color="#8b5cf6"
          note="Top teams on opposite side of the draw"
        />
      </div>

      <div style={{
        marginTop: '1.5rem',
        padding: '1rem 1.25rem',
        background: 'rgba(200,168,75,0.08)',
        border: '1px solid rgba(200,168,75,0.2)',
        borderRadius: 'var(--radius)',
        fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.7,
      }}>
        <strong style={{ color: 'var(--accent)' }}>Competitive balance rule:</strong> Spain (#1) and Argentina (#2) were placed in opposite pathways.
        France (#3) and England (#4) were also split. This ensures the top 4 teams cannot meet until the semi-finals,
        if they all advance from their groups.
      </div>
    </div>
  )
}

function PathwayCard({ title, teams, color, note }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '1.25rem',
      borderTop: `3px solid ${color}`,
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: color, marginBottom: '0.75rem' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {teams.map(t => (
          <div key={t} style={{
            background: 'var(--bg3)', borderRadius: 6, padding: '0.4rem 0.75rem',
            fontSize: '0.85rem', color: 'var(--muted2)',
          }}>
            {t}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--muted)' }}>{note}</div>
    </div>
  )
}
