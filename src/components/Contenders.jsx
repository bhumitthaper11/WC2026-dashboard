import { CONTENDERS, GROUPS } from '../data.js'

const EXTRA = {
  'Spain': {
    manager: 'Luis de la Fuente',
    keyPlayer: 'Pedri',
    style: 'Possession-based tiki-taka',
    wc: 1,
    bio: 'Reigning Euro 2024 champions. World-class depth across the squad with Barcelona and Real Madrid talent.',
  },
  'Argentina': {
    manager: 'Lionel Scaloni',
    keyPlayer: 'Lionel Messi',
    style: 'Counter-attacking',
    wc: 3,
    bio: 'Defending world champions looking for back-to-back titles. Messi leads one last golden generation.',
  },
  'France': {
    manager: 'Didier Deschamps',
    keyPlayer: 'Kylian Mbappé',
    style: 'Balanced / Physical',
    wc: 2,
    bio: 'Les Bleus boast incredible depth with Mbappé, Griezmann and a star-studded midfield.',
  },
  'England': {
    manager: 'Thomas Tuchel',
    keyPlayer: 'Jude Bellingham',
    style: 'High press / Direct',
    wc: 1,
    bio: 'Hungry for a first World Cup since 1966. Tuchel overhauls a squad full of Premier League stars.',
  },
  'Brazil': {
    manager: 'Carlo Ancelotti',
    keyPlayer: 'Vinicius Jr.',
    style: 'Attacking / Jogo Bonito',
    wc: 5,
    bio: 'Record 5-time winners chasing glory. Vinicius Jr. and a new generation aim to end the long wait.',
  },
  'Germany': {
    manager: 'Julian Nagelsmann',
    keyPlayer: 'Florian Wirtz',
    style: 'Gegenpressing',
    wc: 4,
    bio: 'Reinvigorated after a strong Euro 2024. Nagelsmann builds around young talent including Wirtz.',
  },
  'Portugal': {
    manager: 'Roberto Martínez',
    keyPlayer: 'Cristiano Ronaldo',
    style: 'Attacking / Counter',
    wc: 0,
    bio: 'One more chance for Ronaldo\'s dream. Portugal\'s golden generation could finally deliver the ultimate prize.',
  },
  'Netherlands': {
    manager: 'Ronald Koeman',
    keyPlayer: 'Virgil van Dijk',
    style: 'Total Football',
    wc: 0,
    bio: 'Euro 2024 finalists. Strong core around Van Dijk, Dumfries and a talented new generation.',
  },
}

export default function Contenders() {
  return (
    <div className="fade-in">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', letterSpacing: '0.05em' }}>
          TOP CONTENDERS
        </h2>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>
          Odds are pre-tournament betting lines · not affiliated with any bookmaker
        </div>
      </div>

      {/* Odds table */}
      <div style={{
        background: 'var(--card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '2rem',
      }}>
        <div style={{ padding: '0.75rem 1.25rem', background: 'var(--card2)', borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Championship Odds Comparison</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Team', 'FIFA Rank', 'Group', 'Odds', 'Strength', 'WC Titles'].map(h => (
                  <th key={h} style={{
                    padding: '0.6rem 1rem', textAlign: h === 'Team' ? 'left' : 'center',
                    color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 500,
                    letterSpacing: '0.05em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CONTENDERS.map((c, i) => (
                <tr key={c.name} style={{
                  borderBottom: '1px solid var(--border)',
                  background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)',
                }}>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>{c.flag}</span>
                      <div>
                        <div style={{ fontWeight: 500 }}>{c.name}</div>
                        {c.defending && (
                          <div style={{ fontSize: '0.68rem', color: 'var(--accent)' }}>Defending champion</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--muted2)' }}>#{c.rank}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      background: `${c.color}22`, color: c.color,
                      padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600,
                    }}>{c.group}</span>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 500 }}>{c.odds}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ flex: 1, height: 4, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${c.strength}%`, background: c.color, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--font-mono)', minWidth: 28 }}>{c.strength}</span>
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                    {EXTRA[c.name]?.wc ?? '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team deep-dive cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {CONTENDERS.map(c => {
          const ex = EXTRA[c.name]
          return (
            <div key={c.name} style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', overflow: 'hidden',
            }}>
              {/* Card header */}
              <div style={{
                background: `${c.color}18`,
                borderBottom: `1px solid ${c.color}33`,
                padding: '1rem 1.25rem',
                display: 'flex', alignItems: 'center', gap: '1rem',
              }}>
                <div style={{ fontSize: '3rem', lineHeight: 1 }}>{c.flag}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--text)', letterSpacing: '0.03em' }}>
                    {c.name.toUpperCase()}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.3rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted2)' }}>#{c.rank} FIFA</span>
                    <span style={{ fontSize: '0.75rem', color: c.color, fontWeight: 600 }}>Group {c.group}</span>
                    {c.defending && <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>🏆 Defending</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--green)', fontWeight: 600, fontSize: '1.1rem' }}>{c.odds}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--muted)' }}>to win</div>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '1rem 1.25rem' }}>
                {ex && (
                  <>
                    <p style={{ fontSize: '0.83rem', color: 'var(--muted2)', lineHeight: 1.65, marginBottom: '0.875rem' }}>
                      {ex.bio}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <InfoChip label="Manager" value={ex.manager} />
                      <InfoChip label="Key Player" value={ex.keyPlayer} color={c.color} />
                      <InfoChip label="Style" value={ex.style} />
                      <InfoChip label="WC Titles" value={ex.wc || 'None yet'} color={ex.wc ? 'var(--accent)' : undefined} />
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function InfoChip({ label, value, color }) {
  return (
    <div style={{ background: 'var(--bg3)', borderRadius: 'var(--radius)', padding: '0.5rem 0.6rem' }}>
      <div style={{ fontSize: '0.65rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ fontSize: '0.8rem', color: color || 'var(--muted2)', marginTop: '0.15rem', fontWeight: 500, lineHeight: 1.3 }}>{value}</div>
    </div>
  )
}
