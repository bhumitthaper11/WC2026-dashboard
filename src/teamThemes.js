// Per-team brand colors for UI theming
// primary = dominant jersey/brand color, secondary = accent, glow = rgba glow
export const TEAM_THEMES = {
  'Mexico':                    { primary: '#006847', secondary: '#ce1126', glow: 'rgba(0,104,71,0.25)' },
  'South Africa':              { primary: '#007a4d', secondary: '#ffb612', glow: 'rgba(0,122,77,0.25)' },
  'South Korea':               { primary: '#c60c30', secondary: '#003478', glow: 'rgba(198,12,48,0.25)' },
  'Czechia':                   { primary: '#d7141a', secondary: '#11457e', glow: 'rgba(215,20,26,0.25)' },
  'Canada':                    { primary: '#ff0000', secondary: '#ffffff', glow: 'rgba(255,0,0,0.2)' },
  'Bosnia and Herzegovina':    { primary: '#002395', secondary: '#fecb00', glow: 'rgba(0,35,149,0.25)' },
  'Qatar':                     { primary: '#8d1b3d', secondary: '#ffffff', glow: 'rgba(141,27,61,0.25)' },
  'Switzerland':               { primary: '#ff0000', secondary: '#ffffff', glow: 'rgba(255,0,0,0.2)' },
  'Brazil':                    { primary: '#009c3b', secondary: '#ffdf00', glow: 'rgba(0,156,59,0.25)' },
  'Morocco':                   { primary: '#c1272d', secondary: '#006233', glow: 'rgba(193,39,45,0.25)' },
  'Haiti':                     { primary: '#00209f', secondary: '#d21034', glow: 'rgba(0,32,159,0.25)' },
  'Scotland':                  { primary: '#005eb8', secondary: '#ffffff', glow: 'rgba(0,94,184,0.25)' },
  'United States':             { primary: '#b22234', secondary: '#3c3b6e', glow: 'rgba(178,34,52,0.25)' },
  'Paraguay':                  { primary: '#d52b1e', secondary: '#0038a8', glow: 'rgba(213,43,30,0.25)' },
  'Australia':                 { primary: '#ffcd00', secondary: '#00843d', glow: 'rgba(255,205,0,0.25)' },
  'Turkey':                    { primary: '#e30a17', secondary: '#ffffff', glow: 'rgba(227,10,23,0.25)' },
  'Germany':                   { primary: '#000000', secondary: '#dd0000', glow: 'rgba(221,0,0,0.2)' },
  'Curaçao':                   { primary: '#003da5', secondary: '#f9e300', glow: 'rgba(0,61,165,0.25)' },
  'Ivory Coast':               { primary: '#f77f00', secondary: '#009a44', glow: 'rgba(247,127,0,0.25)' },
  'Ecuador':                   { primary: '#ffd100', secondary: '#003087', glow: 'rgba(255,209,0,0.25)' },
  'Netherlands':               { primary: '#ff4f00', secondary: '#ffffff', glow: 'rgba(255,79,0,0.25)' },
  'Japan':                     { primary: '#bc002d', secondary: '#ffffff', glow: 'rgba(188,0,45,0.25)' },
  'Sweden':                    { primary: '#006aa7', secondary: '#fecc02', glow: 'rgba(0,106,167,0.25)' },
  'Tunisia':                   { primary: '#e70013', secondary: '#ffffff', glow: 'rgba(231,0,19,0.25)' },
  'Belgium':                   { primary: '#ef3340', secondary: '#000000', glow: 'rgba(239,51,64,0.25)' },
  'Egypt':                     { primary: '#ce1126', secondary: '#ffffff', glow: 'rgba(206,17,38,0.25)' },
  'Iran':                      { primary: '#239f40', secondary: '#da0000', glow: 'rgba(35,159,64,0.25)' },
  'New Zealand':               { primary: '#00247d', secondary: '#cc142b', glow: 'rgba(0,36,125,0.25)' },
  'Spain':                     { primary: '#c60b1e', secondary: '#ffc400', glow: 'rgba(198,11,30,0.28)' },
  'Cape Verde':                { primary: '#003893', secondary: '#cf2027', glow: 'rgba(0,56,147,0.25)' },
  'Saudi Arabia':              { primary: '#006c35', secondary: '#ffffff', glow: 'rgba(0,108,53,0.25)' },
  'Uruguay':                   { primary: '#5aaae7', secondary: '#ffffff', glow: 'rgba(90,170,231,0.25)' },
  'France':                    { primary: '#002395', secondary: '#ed2939', glow: 'rgba(0,35,149,0.28)' },
  'Senegal':                   { primary: '#00853f', secondary: '#fdef42', glow: 'rgba(0,133,63,0.25)' },
  'Iraq':                      { primary: '#ce1126', secondary: '#000000', glow: 'rgba(206,17,38,0.25)' },
  'Norway':                    { primary: '#ef2b2d', secondary: '#003087', glow: 'rgba(239,43,45,0.25)' },
  'Argentina':                 { primary: '#74acdf', secondary: '#ffffff', glow: 'rgba(116,172,223,0.28)' },
  'Algeria':                   { primary: '#006233', secondary: '#ffffff', glow: 'rgba(0,98,51,0.25)' },
  'Austria':                   { primary: '#ed2939', secondary: '#ffffff', glow: 'rgba(237,41,57,0.25)' },
  'Jordan':                    { primary: '#007a3d', secondary: '#ce1126', glow: 'rgba(0,122,61,0.25)' },
  'Portugal':                  { primary: '#006600', secondary: '#ff0000', glow: 'rgba(0,102,0,0.25)' },
  'Congo DR':                  { primary: '#007fff', secondary: '#f7d618', glow: 'rgba(0,127,255,0.25)' },
  'Uzbekistan':                { primary: '#1eb53a', secondary: '#ce1126', glow: 'rgba(30,181,58,0.25)' },
  'Colombia':                  { primary: '#fcd116', secondary: '#003087', glow: 'rgba(252,209,22,0.25)' },
  'England':                   { primary: '#ffffff', secondary: '#cf081f', glow: 'rgba(207,8,31,0.2)' },
  'Croatia':                   { primary: '#ff0000', secondary: '#0c1874', glow: 'rgba(255,0,0,0.2)' },
  'Ghana':                     { primary: '#006b3f', secondary: '#fcd116', glow: 'rgba(0,107,63,0.25)' },
  'Panama':                    { primary: '#da121a', secondary: '#005293', glow: 'rgba(218,18,26,0.25)' },
}

export const DEFAULT_THEME = { primary: '#c8a84b', secondary: '#e8c96d', glow: 'rgba(200,168,75,0.15)' }

export function getTeamTheme(teamName) {
  return TEAM_THEMES[teamName] || DEFAULT_THEME
}

export function applyTeamTheme(teamName) {
  const theme = getTeamTheme(teamName)
  const root = document.documentElement
  root.style.setProperty('--team-primary', theme.primary)
  root.style.setProperty('--team-secondary', theme.secondary)
  root.style.setProperty('--team-glow', theme.glow)
  root.style.setProperty('--team-glow2', theme.glow.replace(/[\d.]+\)$/, '0.06)'))
}
