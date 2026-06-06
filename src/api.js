/**
 * WC2026 API integration — wc2026api.com
 *
 * Free tier: 100 requests/day — no API key needed for /standings and /matches
 * Pro tier ($4.99 one-time): 500–unlimited req/day — set your key in .env:
 *   VITE_WC2026_API_KEY=wc2026_yourkey
 *
 * Docs: https://api.wc2026api.com/docs
 */

const BASE = 'https://api.wc2026api.com'
const API_KEY = import.meta.env.VITE_WC2026_API_KEY || ''

// In-memory cache: { [cacheKey]: { data, ts } }
const CACHE = {}
const CACHE_TTL = {
  live: 30_000,       // 30s for live/in-progress matches
  recent: 60_000,     // 1 min for finished matches
  standings: 60_000,  // 1 min for group standings
  fixtures: 300_000,  // 5 min for upcoming fixtures
}

function ttlFor(data) {
  // If any match is live, use short TTL
  const matches = Array.isArray(data) ? data : data?.matches || []
  const hasLive = matches.some(m => ['1H', 'HT', '2H', 'ET1', 'ET2', 'PEN'].includes(m?.phase))
  return hasLive ? CACHE_TTL.live : CACHE_TTL.fixtures
}

async function apiFetch(path, params = {}) {
  const url = new URL(`${BASE}${path}`)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const cacheKey = url.toString()
  const now = Date.now()
  const cached = CACHE[cacheKey]
  if (cached && now - cached.ts < cached.ttl) {
    return cached.data
  }

  const headers = { 'Content-Type': 'application/json' }
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`

  const res = await fetch(url.toString(), { headers })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  const data = await res.json()

  const ttl = path.includes('standing') ? CACHE_TTL.standings : ttlFor(data)
  CACHE[cacheKey] = { data, ts: now, ttl }
  return data
}

// ── Public API ─────────────────────────────────────────────────

/** All 104 matches, optionally filtered */
export async function fetchMatches({ group, team, round, status } = {}) {
  const params = {}
  if (group) params.group = group
  if (team) params.team = team
  if (round) params.round = round
  if (status) params.status = status
  return apiFetch('/matches', params)
}

/** Live matches only (phase = 1H | HT | 2H | ET1 | ET2 | PEN) */
export async function fetchLiveMatches() {
  return apiFetch('/matches', { status: 'live' })
}

/** Group standings — all 12 groups */
export async function fetchStandings() {
  return apiFetch('/standings')
}

/** All 48 teams */
export async function fetchTeams() {
  return apiFetch('/teams')
}

/** All 16 stadiums */
export async function fetchStadiums() {
  return apiFetch('/stadiums')
}

// ── Normalise helpers ──────────────────────────────────────────

/**
 * Convert API match shape to the shape our components expect.
 * API returns: { id, home_team, away_team, home_score, away_score, phase, group_name, stadium, kickoff_utc, … }
 */
export function normaliseMatch(m) {
  const kickoff = m.kickoff_utc ? new Date(m.kickoff_utc) : null
  const dateStr = kickoff
    ? kickoff.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '—'
  const timeStr = kickoff
    ? kickoff.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
    : '—'

  const live = ['1H', 'HT', '2H', 'ET1', 'ET2', 'PEN'].includes(m.phase)
  const finished = ['FT', 'FT_PEN'].includes(m.phase)
  const hasScore = live || finished

  return {
    id: m.id,
    home: m.home_team,
    away: m.away_team,
    homeScore: hasScore ? (m.home_score ?? 0) : null,
    awayScore: hasScore ? (m.away_score ?? 0) : null,
    phase: m.phase || 'PRE',
    live,
    finished,
    date: dateStr,
    time: timeStr,
    venue: m.stadium || '',
    group: m.group_name || '',
    round: m.round || 'group',
    kickoff,
  }
}

/**
 * Convert API standings shape to our table format.
 * API returns: { group, teams: [{ team, played, won, drawn, lost, gf, ga, points }] }
 */
export function normaliseStandings(apiGroups) {
  if (!Array.isArray(apiGroups)) return []
  return apiGroups.map(g => ({
    id: g.group,
    teams: (g.teams || []).map(t => ({
      name: t.team,
      p: t.played ?? 0,
      w: t.won ?? 0,
      d: t.drawn ?? 0,
      l: t.lost ?? 0,
      gf: t.gf ?? 0,
      ga: t.ga ?? 0,
      pts: t.points ?? 0,
    })),
  }))
}

// ── Phase label helper ─────────────────────────────────────────
export function phaseLabel(phase) {
  return {
    PRE: 'Upcoming',
    '1H': '1st Half 🔴',
    HT: 'Half Time',
    '2H': '2nd Half 🔴',
    ET1: 'Extra Time 1 🔴',
    ET2: 'Extra Time 2 🔴',
    PEN: 'Penalties 🔴',
    FT: 'Full Time',
    FT_PEN: 'FT (Pens)',
  }[phase] || phase
}
