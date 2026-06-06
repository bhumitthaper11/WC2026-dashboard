import { useState, useEffect, useCallback, useRef } from 'react'
import {
  fetchMatches, fetchLiveMatches, fetchStandings,
  normaliseMatch, normaliseStandings,
} from './api.js'
import { GROUPS } from './data.js'

// ── Generic fetch hook ─────────────────────────────────────────
function useFetch(fetcher, deps = [], refreshMs = null) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const timerRef = useRef(null)

  const load = useCallback(async () => {
    try {
      const result = await fetcher()
      setData(result)
      setError(null)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLoading(true)
    load()
    if (refreshMs) {
      timerRef.current = setInterval(load, refreshMs)
    }
    return () => clearInterval(timerRef.current)
  }, [load, refreshMs])

  return { data, loading, error, lastUpdated, refresh: load }
}

// ── Live matches — poll every 30s when any match is live ───────
export function useLiveMatches() {
  const [hasLive, setHasLive] = useState(false)
  const { data, loading, error, lastUpdated, refresh } = useFetch(
    () => fetchLiveMatches().then(raw => {
      const matches = Array.isArray(raw) ? raw.map(normaliseMatch) : []
      setHasLive(matches.some(m => m.live))
      return matches
    }),
    [],
    30_000  // always poll every 30s for live matches tab
  )
  return { matches: data || [], loading, error, lastUpdated, hasLive, refresh }
}

// ── All matches for schedule view ─────────────────────────────
export function useAllMatches(filters = {}) {
  const key = JSON.stringify(filters)
  return useFetch(
    () => fetchMatches(filters).then(raw =>
      Array.isArray(raw) ? raw.map(normaliseMatch) : []
    ),
    [key],
    60_000   // refresh every 60s
  )
}

// ── Group standings ────────────────────────────────────────────
export function useStandings() {
  const { data, loading, error, lastUpdated, refresh } = useFetch(
    () => fetchStandings().then(raw => normaliseStandings(raw)),
    [],
    60_000
  )

  // Merge API standings with our local group colour/flag data
  const merged = data
    ? GROUPS.map(localGroup => {
        const apiGroup = data.find(g => g.id === localGroup.id)
        if (!apiGroup) return localGroup
        const teams = apiGroup.teams.map(apiTeam => {
          const localTeam = localGroup.teams.find(t => t.name === apiTeam.name) || {}
          return { ...localTeam, ...apiTeam }
        })
        return { ...localGroup, teams }
      })
    : null

  return { groups: merged, loading, error, lastUpdated, refresh }
}

// ── Recent results (last 5 finished) ──────────────────────────
export function useRecentResults() {
  return useFetch(
    () => fetchMatches({ status: 'finished' }).then(raw => {
      const matches = Array.isArray(raw) ? raw.map(normaliseMatch) : []
      return matches.sort((a, b) => b.kickoff - a.kickoff).slice(0, 10)
    }),
    [],
    120_000
  )
}

// ── Upcoming matches (next 5) ──────────────────────────────────
export function useUpcomingMatches() {
  return useFetch(
    () => fetchMatches({ status: 'scheduled' }).then(raw => {
      const matches = Array.isArray(raw) ? raw.map(normaliseMatch) : []
      return matches.sort((a, b) => a.kickoff - b.kickoff).slice(0, 5)
    }),
    [],
    300_000
  )
}
