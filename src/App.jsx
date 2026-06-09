import { useState, useEffect } from 'react'
import WebGLBackground from './components/WebGLBackground.jsx'
import ParticleOverlay from './components/ParticleOverlay.jsx'
import Onboarding from './components/Onboarding.jsx'
import Header from './components/Header.jsx'
import LiveBanner from './components/LiveBanner.jsx'
import Overview from './components/Overview.jsx'
import Groups from './components/Groups.jsx'
import Schedule from './components/Schedule.jsx'
import Venues from './components/Venues.jsx'
import Contenders from './components/Contenders.jsx'
import Bracket from './components/Bracket.jsx'
import { applyTeamTheme, getTeamTheme, DEFAULT_THEME } from './teamThemes.js'

const TABS = [
  { id: 'overview',   label: 'Overview',   icon: '⚽' },
  { id: 'groups',     label: 'Groups',     icon: '📊' },
  { id: 'schedule',   label: 'Schedule',   icon: '📅' },
  { id: 'bracket',    label: 'Bracket',    icon: '🏆' },
  { id: 'venues',     label: 'Venues',     icon: '🏟️' },
  { id: 'contenders', label: 'Contenders', icon: '⭐' },
]

const STORAGE_KEY = 'wc2026_user_v2'

export default function App() {
  const [user, setUser] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [visible, setVisible] = useState(true)
  const [theme, setTheme] = useState(DEFAULT_THEME)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setUser(parsed)
        if (parsed.team) {
          const t = getTeamTheme(parsed.team.name)
          setTheme(t)
          applyTeamTheme(parsed.team.name)
        }
      } catch (_) {}
    } else {
      setTimeout(() => setShowOnboarding(true), 200)
    }
  }, [])

  const handleOnboardingComplete = ({ name, team }) => {
    const newUser = { name, team }
    setUser(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    if (team) {
      const t = getTeamTheme(team.name)
      setTheme(t)
      applyTeamTheme(team.name)
    }
    setShowOnboarding(false)
  }

  const changeTab = (id) => {
    if (id === activeTab) return
    setVisible(false)
    setTimeout(() => { setActiveTab(id); setVisible(true) }, 150)
  }

  const resetUser = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    setTheme(DEFAULT_THEME)
    applyTeamTheme(null)
    setShowOnboarding(true)
  }

  const renderView = () => {
    switch (activeTab) {
      case 'overview':   return <Overview   setTab={changeTab} user={user} theme={theme} />
      case 'groups':     return <Groups />
      case 'schedule':   return <Schedule />
      case 'bracket':    return <Bracket />
      case 'venues':     return <Venues />
      case 'contenders': return <Contenders />
      default:           return <Overview   setTab={changeTab} user={user} theme={theme} />
    }
  }

  return (
    <>
      {/* Layer 0: WebGL fluid background */}
      <WebGLBackground
        teamPrimary={theme.primary}
        teamSecondary={theme.secondary}
        teamR={theme.r}
        teamG={theme.g}
        teamB={theme.b}
      />

      {/* Layer 1: Canvas particle overlay */}
      <ParticleOverlay teamR={theme.r} teamG={theme.g} teamB={theme.b} />

      {/* Layer 2: Onboarding modal */}
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      {/* Layer 3: UI */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        <Header user={user} theme={theme} />
        <LiveBanner />

        {/* ── NAV ── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          background: 'rgba(4,6,15,0.75)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div style={{
            maxWidth: 1200, margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', overflowX: 'auto' }}>
              {TABS.map((tab, i) => {
                const active = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => changeTab(tab.id)}
                    style={{
                      position: 'relative',
                      padding: '0.9rem 1.1rem',
                      background: 'none',
                      border: 'none',
                      borderBottom: active
                        ? `2px solid ${theme.primary}`
                        : '2px solid transparent',
                      color: active ? theme.primary : 'rgba(255,255,255,0.45)',
                      fontSize: '0.82rem',
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease',
                      letterSpacing: '0.04em',
                      fontFamily: 'var(--font-body)',
                    }}
                  >
                    {active && (
                      <span style={{
                        position: 'absolute',
                        bottom: 0, left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%', height: 2,
                        background: `radial-gradient(ellipse, ${theme.primary} 0%, transparent 100%)`,
                        filter: 'blur(3px)',
                      }} />
                    )}
                    <span style={{ marginRight: '0.35rem', fontSize: '0.9rem' }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {user && (
              <button
                onClick={resetUser}
                style={{
                  background: `rgba(${theme.r},${theme.g},${theme.b},0.1)`,
                  border: `1px solid rgba(${theme.r},${theme.g},${theme.b},0.3)`,
                  borderRadius: 20,
                  padding: '0.3rem 0.875rem',
                  color: theme.primary,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  flexShrink: 0,
                  marginLeft: '1rem',
                  fontFamily: 'var(--font-body)',
                }}
              >
                ✏️ Change Team
              </button>
            )}
          </div>
        </nav>

        {/* ── CONTENT ── */}
        <main
          style={{
            flex: 1,
            maxWidth: 1200,
            margin: '0 auto',
            padding: '2rem 1.5rem',
            width: '100%',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          {renderView()}
        </main>

        {/* ── FOOTER ── */}
        <footer style={{
          textAlign: 'center',
          padding: '1rem 1.5rem',
          fontSize: '0.75rem',
          color: 'rgba(255,255,255,0.25)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          background: 'rgba(4,6,15,0.6)',
        }}>
          FIFA World Cup 2026 · June 11 – July 19 · USA, Canada & Mexico
          {user?.team && (
            <span style={{ color: theme.primary, marginLeft: '0.75rem' }}>
              · {user.team.flag} Go {user.team.name}!
            </span>
          )}
        </footer>
      </div>
    </>
  )
}
