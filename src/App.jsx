import { useState, useEffect } from 'react'
import Onboarding from './components/Onboarding.jsx'
import Header from './components/Header.jsx'
import LiveBanner from './components/LiveBanner.jsx'
import Overview from './components/Overview.jsx'
import Groups from './components/Groups.jsx'
import Schedule from './components/Schedule.jsx'
import Venues from './components/Venues.jsx'
import Contenders from './components/Contenders.jsx'
import Bracket from './components/Bracket.jsx'
import { applyTeamTheme } from './teamThemes.js'

const TABS = [
  { id: 'overview',   label: 'Overview',    icon: '⚽' },
  { id: 'groups',     label: 'Groups',      icon: '📊' },
  { id: 'schedule',   label: 'Schedule',    icon: '📅' },
  { id: 'bracket',    label: 'Bracket',     icon: '🏆' },
  { id: 'venues',     label: 'Venues',      icon: '🏟️' },
  { id: 'contenders', label: 'Contenders',  icon: '⭐' },
]

const STORAGE_KEY = 'wc2026_user'

export default function App() {
  const [user, setUser] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [tabTransition, setTabTransition] = useState(true)

  // Load saved user on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      setUser(parsed)
      if (parsed.team) applyTeamTheme(parsed.team.name)
    } else {
      // Small delay so page isn't immediately replaced
      setTimeout(() => setShowOnboarding(true), 100)
    }
  }, [])

  const handleOnboardingComplete = ({ name, team }) => {
    const newUser = { name, team }
    setUser(newUser)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    if (team) applyTeamTheme(team.name)
    setShowOnboarding(false)
  }

  const handleTabChange = (id) => {
    setTabTransition(false)
    setTimeout(() => {
      setActiveTab(id)
      setTabTransition(true)
    }, 120)
  }

  const resetUser = () => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    applyTeamTheme(null)
    setShowOnboarding(true)
  }

  const renderView = () => {
    switch (activeTab) {
      case 'overview':   return <Overview setTab={handleTabChange} user={user} />
      case 'groups':     return <Groups />
      case 'schedule':   return <Schedule />
      case 'bracket':    return <Bracket />
      case 'venues':     return <Venues />
      case 'contenders': return <Contenders />
      default:           return <Overview setTab={handleTabChange} user={user} />
    }
  }

  return (
    <>
      {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Header user={user} />
        <LiveBanner />

        {/* Nav */}
        <nav style={{
          background: 'var(--bg2)',
          borderBottom: '1px solid var(--border)',
          position: 'sticky', top: 0, zIndex: 100,
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{
            maxWidth: 1200, margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: '0.1rem', overflowX: 'auto' }}>
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    padding: '0.875rem 1.1rem',
                    background: 'none', border: 'none',
                    borderBottom: activeTab === tab.id
                      ? '2px solid var(--team-primary)'
                      : '2px solid transparent',
                    color: activeTab === tab.id ? 'var(--team-primary)' : 'var(--muted2)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === tab.id ? 600 : 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.25s ease',
                    letterSpacing: '0.02em',
                  }}
                >
                  <span style={{ marginRight: '0.35rem' }}>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Reset / change team */}
            {user && (
              <button
                onClick={resetUser}
                title="Change name or team"
                style={{
                  background: 'none', border: '1px solid var(--border)',
                  borderRadius: 20, padding: '0.3rem 0.8rem',
                  color: 'var(--muted)', fontSize: '0.75rem',
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.2s',
                  flexShrink: 0, marginLeft: '0.75rem',
                }}
              >
                ✏️ Change
              </button>
            )}
          </div>
        </nav>

        {/* Page content */}
        <main style={{
          flex: 1,
          maxWidth: 1200, margin: '0 auto',
          padding: '2rem 1.5rem',
          width: '100%',
          opacity: tabTransition ? 1 : 0,
          transform: tabTransition ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}>
          {renderView()}
        </main>

        <footer style={{
          textAlign: 'center', padding: '1.25rem',
          color: 'var(--muted)', fontSize: '0.78rem',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg2)',
        }}>
          FIFA World Cup 2026 · June 11 – July 19 · USA, Canada & Mexico
          {user?.team && (
            <span style={{ color: 'var(--team-primary)', marginLeft: '0.75rem', transition: 'color 0.6s' }}>
              · {user.team.flag} Go {user.team.name}!
            </span>
          )}
        </footer>
      </div>
    </>
  )
}
