# ⚽ FIFA World Cup 2026 Dashboard

A live, auto-updating dashboard for the 2026 FIFA World Cup — built with React + Vite, deployable to Vercel in minutes.

## Features

- 🔴 **Live scores** — auto-refreshes every 30s during active matches
- 📊 **Group standings** — live W/D/L/Pts from the API
- 📅 **Full schedule** — all 104 matches, filterable by group/status/team
- 🏆 **Knockout bracket** — format explained with pathway view
- 🏟️ **Venues** — all 16 stadiums across USA, Canada & Mexico
- ⭐ **Contenders** — top 8 teams with odds, managers, key players

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Add your API key for higher rate limits
cp .env.example .env.local
# Edit .env.local and paste your key from https://www.wc2026api.com

# 3. Run locally
npm run dev
```

## API Integration

Live data is powered by [wc2026api.com](https://www.wc2026api.com) — an unofficial fan project with no FIFA affiliation.

| Tier | Price | Requests/day | Key required |
|------|-------|-------------|--------------|
| Free | $0 | 100/day | Yes (free signup) |
| Pro  | $4.99 one-time | 500–unlimited | Yes |

> The dashboard works without a key in development but you'll need one for production to avoid hitting rate limits during live matches.

### Setting the key on Vercel

In your Vercel project dashboard:
1. Go to **Settings → Environment Variables**
2. Add `VITE_WC2026_API_KEY` = your key
3. Redeploy

## Deploy to Vercel

```bash
# Option A — CLI
npm install -g vercel
vercel

# Option B — GitHub (recommended)
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOUR_NAME/wc2026.git
git push -u origin main
# Then import repo at vercel.com → no config needed
```

## Project Structure

```
src/
  api.js          ← API client, normalise helpers, caching
  hooks.js        ← React hooks: useStandings, useAllMatches, useLiveMatches…
  data.js         ← Static fallback data (groups, contenders, venues)
  components/
    Header.jsx      ← Live countdown timer
    LiveBanner.jsx  ← Live score ticker at top of page
    Overview.jsx    ← Home: stats, recent results, upcoming matches
    Groups.jsx      ← 12 group standing tables
    Schedule.jsx    ← Full filterable fixture list
    Bracket.jsx     ← Knockout bracket
    Venues.jsx      ← Stadium cards
    Contenders.jsx  ← Top 8 team deep-dives
    ApiStatus.jsx   ← Connection indicator + refresh button
```

## Refresh Intervals

| Data | Interval |
|------|---------|
| Live match scores | 30s |
| Group standings | 60s |
| All fixtures | 60s |
| Upcoming matches | 5 min |

All responses are in-memory cached — the dashboard won't hammer the API on re-renders.
