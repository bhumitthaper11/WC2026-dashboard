import { useState } from 'react'
import Header from './components/Header.jsx'
import Overview from './components/Overview.jsx'
import Groups from './components/Groups.jsx'
import Schedule from './components/Schedule.jsx'
import Venues from './components/Venues.jsx'
import Contenders from './components/Contenders.jsx'
import Bracket from './components/Bracket.jsx'

const TABS = [
  { id: 'overview', label: 'Overview', icon: '⚽' },
  { id: 'groups', label: 'Groups', icon: '📊' },
  { id: 'schedule', label: 'Schedule', icon: '📅' },
  { id: 'bracket', label: 'Bracket', icon: '🏆' },
  { id: 'venues', label: 'Venues', icon: '🏟️' },
  { id: 'contenders', label: 'Contenders', icon: '⭐' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderView = () => {
    switch (activeTab) {
      case 'overview': return <Overview setTab={setActiveTab} />
      case 'groups': return <Groups />
      case 'schedule': return <Schedule />
      case 'bracket': return <Bracket />
      case 'venues': return <Venues />
      case 'contenders': return <Contenders />
      default: return <Overview setTab={setActiveTab} />
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <nav style={{
        background: 'var(--bg2)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          gap: '0.25rem',
          overflowX: 'auto',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.875rem 1.25rem',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--muted2)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                letterSpacing: '0.02em',
              }}
            >
              <span style={{ marginRight: '0.4rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem', width: '100%' }}>
        {renderView()}
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        color: 'var(--muted)',
        fontSize: '0.8rem',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
      }}>
        FIFA World Cup 2026 · June 11 – July 19 · USA, Canada & Mexico
      </footer>
    </div>
  )
}
