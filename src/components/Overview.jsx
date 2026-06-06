import { GROUPS, CONTENDERS } from '../data.js'
import { useRecentResults, useUpcomingMatches } from '../hooks.js'
import { phaseLabel } from '../api.js'
import { getTeamTheme } from '../teamThemes.js'

const statCards = [
  { value: '48', label: 'Teams', icon: '🌍' },
  { value: '12', label: 'Groups', icon: '📊' },
  { value: '104', label: 'Matches', icon: '⚽' },
  { value: '16', label: 'Venues', icon: '🏟️' },
  { value: '39', label: 'Days', icon: '📅' },
  { value: '3', label: 'Host Nations', icon: '🌎' },
]

const timeline = [
  { phase: 'Group Stage',   dates: 'Jun 11 – Jun 27', teams: 48, icon: '📋', color: '#3b82f6' },
  { phase: 'Round of 32',   dates: 'Jun 29 – Jul 3',  teams: 32, icon: '⚔️', color: '#8b5cf6' },
  { phase: 'Round of 16',   dates: 'Jul 5 – Jul 7',   teams: 16, icon: '🥊', color: '#f59e0b' },
  { phase: 'Quarter-finals',dates: 'Jul 9 – Jul 11',  teams: 8,  icon: '🎯', color: '#ef4444' },
  { phase: 'Semi-finals',   dates: 'Jul 14 – Jul 15', teams: 4,  icon: '🔥', color: '#ec4899' },
  { phase: 'Final',         dates: 'Jul 19',           teams: 2,  icon: '🏆', color: '#c8a84b' },
]

function getFlag(teamName) {
  for (const g of GROUPS) {
    const t = g.teams.find(t => t.name === teamName)
    if (t) return t.flag
  }
  return '🏳️'
}

function getGroupForTeam(teamName) {
  for (const g of GROUPS) {
    if (g.teams.find(t => t.name === teamName)) return g
  }
  return null
}

// ── My Team Hero Card ────────────────────────────────────────────
function MyTeamHero({ user }) {
  if (!user?.team) return null
  const theme = getTeamTheme(user.team.name)
  const group = getGroupForTeam(user.team.name)

  return (
    <div className="fade-up" style={{
      marginBottom: '2.5rem',
      background: `linear-gradient(135deg, ${theme.primary}18 0%, ${theme.secondary}0a 100%)`,
      border: `1px solid ${theme.primary}55`,
      borderRadius: 'var(--radius-lg)',
      padding: '1.75rem 2rem',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Big faded flag bg */}
      <div style={{
        position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)',
        fontSize: '8rem', opacity: 0.07, pointerEvents: 'none', lineHeight: 1,
        filter: 'blur(4px)',
      }}>
        {user.team.flag}
      </div>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '4rem', animation: 'float 4s ease-in-out infinite' }}>{user.team.flag}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.75rem', color: theme.primary, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            Your Team
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            letterSpacing: '0.04em', lineHeight: 1, color: 'var(--text)',
          }}>
            {user.team.name.toUpperCase()}
          </h2>
          {group && (
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Badge color={group.color}>Group {group.id}</Badge>
              <Badge color={theme.primary}>{group.teams.length} Teams in Group</Badge>
              <Badge color="var(--muted2)">
                {group.teams.findIndex(t => t.name === user.team.name) + 1}st seeding
              </Badge>
            </div>
          )}
        </div>

        {/* Group teammates */}
        {group && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: 160 }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Group {group.id}</div>
            {group.teams.map(t => (
              <div key={t.name} style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.35rem 0.6rem',
                background: t.name === user.team.name ? `${theme.primary}22` : 'var(--card)',
                borderRadius: 6,
                border: `1px solid ${t.name === user.team.name ? theme.primary + '66' : 'var(--border)'}`,
                fontSize: '0.82rem',
              }}>
                <span>{t.flag}</span>
                <span style={{ fontWeight: t.name === user.team.name ? 600 : 400, color: t.name === user.team.name ? theme.primary : 'var(--muted2)' }}>{t.name}</span>
                {t.name === user.team.name && <span style={{ fontSize: '0.65rem', color: theme.primary, marginLeft: 'auto' }}>YOU</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Badge({ children, color }) {
  return (
    <span style={{
      background: `${color}22`, color: color,
      fontSize: '0.72rem', fontWeight: 600,
      padding: '0.2rem 0.6rem', borderRadius: 20,
      border: `1px solid ${color}44`,
    }}>{children}</span>
  )
}

function LiveMatchCard({ m }) {
  return (
    <div style={{
      background: 'var(--card)', border: '1px solid rgba(34,197,94,0.3)',
      borderRadius: 'var(--radius)', padding: '0.75rem 1rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem',
      animation: 'glow 2s ease-in-out infinite',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>{getFlag(m.home)}</span>
        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{m.home}</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--green)' }}>{m.homeScore} – {m.awayScore}</div>
        <div style={{ fontSize: '0.65rem', color: 'var(--green)', marginTop: 1 }}>{phaseLabel(m.phase)}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{m.away}</span>
        <span>{getFlag(m.away)}</span>
      </div>
    </div>
  )
}

function ResultCard({ m }) {
  const homeWin = m.homeScore > m.awayScore, awayWin = m.awayScore > m.homeScore
  return (
    <div className="lift" style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '0.6rem 0.875rem',
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '0.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: homeWin ? 600 : 400, color: homeWin ? 'var(--text)' : 'var(--muted2)' }}>{m.home}</span>
        <span>{getFlag(m.home)}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600, background: 'var(--bg3)', padding: '0.2rem 0.6rem', borderRadius: 6, minWidth: 52, textAlign: 'center' }}>
        {m.homeScore} – {m.awayScore}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span>{getFlag(m.away)}</span>
        <span style={{ fontSize: '0.82rem', fontWeight: awayWin ? 600 : 400, color: awayWin ? 'var(--text)' : 'var(--muted2)' }}>{m.away}</span>
      </div>
    </div>
  )
}

function UpcomingCard({ m }) {
  return (
    <div className="lift" style={{
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius)', padding: '0.6rem 0.875rem',
      display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '0.5rem',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--muted2)' }}>{m.home}</span>
        <span>{getFlag(m.home)}</span>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>{m.date}</div>
        <div style={{ color: 'var(--team-primary)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 500, transition: 'color 0.6s' }}>{m.time}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span>{getFlag(m.away)}</span>
        <span style={{ fontSize: '0.82rem', color: 'var(--muted2)' }}>{m.away}</span>
      </div>
    </div>
  )
}

function LoadingPlaceholder({ rows = 3 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="skeleton" style={{ height: 44, animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  )
}

function EmptyState({ children }) {
  return (
    <div style={{ color: 'var(--muted)', fontSize: '0.85rem', padding: '1.25rem', background: 'var(--card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', textAlign: 'center', fontStyle: 'italic' }}>
      {children}
    </div>
  )
}

export default function Overview({ setTab, user }) {
  const { data: recentResults, loading: resultsLoading } = useRecentResults()
  const { data: upcoming,      loading: upcomingLoading } = useUpcomingMatches()

  const liveMatches     = recentResults?.filter(m => m.live)     || []
  const finishedMatches = recentResults?.filter(m => m.finished) || []

  return (
    <div>
      {/* Personalized hero */}
      <MyTeamHero user={user} />

      {/* Live matches */}
      {liveMatches.length > 0 && (
        <div className="fade-up" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse 1s infinite' }} />
            <SectionTitle style={{ marginBottom: 0, color: 'var(--green)' }}>LIVE NOW</SectionTitle>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {liveMatches.map(m => <LiveMatchCard key={m.id} m={m} />)}
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="fade-up stagger" style={{ marginBottom: '2.5rem' }}>
        <SectionTitle>Tournament at a Glance</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
          {statCards.map(s => (
            <div key={s.label} className="lift" style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '1.25rem 1rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--team-primary)', lineHeight: 1, transition: 'color 0.6s' }}>{s.value}</div>
              <div style={{ color: 'var(--muted2)', fontSize: '0.8rem', marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent results + Upcoming */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="slide-in-left" style={{ animation: 'slideInLeft 0.5s ease both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
            <SectionTitle style={{ marginBottom: 0 }}>Recent Results</SectionTitle>
            <ViewAllBtn onClick={() => setTab('schedule')} />
          </div>
          {resultsLoading && !recentResults ? <LoadingPlaceholder rows={4} />
            : finishedMatches.length === 0 ? <EmptyState>No results yet — tournament starts Jun 11</EmptyState>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>{finishedMatches.slice(0, 5).map(m => <ResultCard key={m.id} m={m} />)}</div>}
        </div>

        <div style={{ animation: 'slideInRight 0.5s 0.1s ease both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
            <SectionTitle style={{ marginBottom: 0 }}>Up Next</SectionTitle>
            <ViewAllBtn onClick={() => setTab('schedule')} />
          </div>
          {upcomingLoading && !upcoming ? <LoadingPlaceholder rows={4} />
            : !upcoming || upcoming.length === 0 ? <EmptyState>No upcoming matches</EmptyState>
            : <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>{upcoming.map(m => <UpcomingCard key={m.id} m={m} />)}</div>}
        </div>
      </div>

      {/* Timeline */}
      <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
        <SectionTitle>Tournament Roadmap</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }} className="stagger">
          {timeline.map(phase => (
            <div key={phase.phase} className="lift" style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.9rem 1.25rem',
              borderLeft: `3px solid ${phase.color}`,
              animation: 'fadeUp 0.4s ease both',
            }}>
              <div style={{ fontSize: '1.25rem', width: 32, textAlign: 'center' }}>{phase.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{phase.phase}</div>
                <div style={{ color: 'var(--muted2)', fontSize: '0.8rem' }}>{phase.dates}</div>
              </div>
              <div style={{ background: 'var(--bg3)', borderRadius: 20, padding: '0.25rem 0.75rem', fontSize: '0.8rem', color: 'var(--muted2)', fontFamily: 'var(--font-mono)' }}>
                {phase.teams} teams
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Contenders */}
      <div className="fade-up" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <SectionTitle style={{ marginBottom: 0 }}>Top Contenders</SectionTitle>
          <ViewAllBtn onClick={() => setTab('contenders')} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }} className="stagger">
          {CONTENDERS.slice(0, 4).map(c => (
            <div key={c.name} className="lift" style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', padding: '1.25rem',
              position: 'relative', overflow: 'hidden',
              animation: 'fadeUp 0.4s ease both',
            }}>
              {c.defending && <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(200,168,75,0.15)', color: 'var(--accent)', fontSize: '0.65rem', padding: '0.2rem 0.5rem', borderRadius: 20, border: '1px solid rgba(200,168,75,0.3)', fontWeight: 600 }}>DEFENDING</div>}
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{c.flag}</div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem' }}>{c.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                <SmallStat label="Rank" value={`#${c.rank}`} color="var(--team-primary)" />
                <SmallStat label="Group" value={c.group} />
                <SmallStat label="Odds" value={c.odds} color="var(--green)" />
              </div>
              <div style={{ marginTop: '0.75rem', height: 3, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${c.strength}%`, background: c.color, borderRadius: 2, transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All 12 Groups */}
      <div className="fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <SectionTitle style={{ marginBottom: 0 }}>All 12 Groups</SectionTitle>
          <ViewAllBtn onClick={() => setTab('groups')} label="Full standings →" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(175px, 1fr))', gap: '0.6rem' }} className="stagger">
          {GROUPS.map(g => (
            <div key={g.id} className="lift" style={{
              background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '0.75rem 1rem',
              borderTop: `3px solid ${g.color}`,
              animation: 'fadeUp 0.4s ease both',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: g.color, marginBottom: '0.5rem' }}>GROUP {g.id}</div>
              {g.teams.map(t => {
                const isMyTeam = user?.team?.name === t.name
                return (
                  <div key={t.name} style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem',
                    padding: isMyTeam ? '0.15rem 0.4rem' : '0.15rem 0',
                    background: isMyTeam ? `var(--team-glow2)` : 'transparent',
                    borderRadius: 4,
                    border: isMyTeam ? '1px solid var(--team-primary)' : '1px solid transparent',
                    transition: 'all 0.4s ease',
                  }}>
                    <span style={{ fontSize: '0.9rem' }}>{t.flag}</span>
                    <span style={{ fontSize: '0.8rem', color: isMyTeam ? 'var(--team-primary)' : 'var(--muted2)', fontWeight: isMyTeam ? 600 : 400, transition: 'color 0.4s' }}>{t.name}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionTitle({ children, style }) {
  return <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '0.05em', marginBottom: '1rem', ...style }}>{children}</h2>
}

function SmallStat({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ color: 'var(--muted)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
      <div style={{ color: color || 'var(--muted2)', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{value}</div>
    </div>
  )
}

function ViewAllBtn({ onClick, label = 'View all →' }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: '1px solid var(--border2)', borderRadius: 20,
      padding: '0.35rem 0.9rem', color: 'var(--team-primary)', fontSize: '0.8rem',
      cursor: 'pointer', transition: 'all 0.2s',
    }}>{label}</button>
  )
}
