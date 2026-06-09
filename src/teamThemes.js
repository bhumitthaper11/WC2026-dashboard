export const TEAM_THEMES = {
  'Mexico':                 { primary:'#00a650', secondary:'#ce1126', r:0,   g:166, b:80  },
  'South Africa':           { primary:'#007a4d', secondary:'#ffb612', r:0,   g:122, b:77  },
  'South Korea':            { primary:'#c60c30', secondary:'#003478', r:198, g:12,  b:48  },
  'Czechia':                { primary:'#d7141a', secondary:'#11457e', r:215, g:20,  b:26  },
  'Canada':                 { primary:'#ff2020', secondary:'#ffffff', r:255, g:32,  b:32  },
  'Bosnia and Herzegovina': { primary:'#002395', secondary:'#fecb00', r:0,   g:35,  b:149 },
  'Qatar':                  { primary:'#8d1b3d', secondary:'#c8a97e', r:141, g:27,  b:61  },
  'Switzerland':            { primary:'#ff0000', secondary:'#ffffff', r:255, g:0,   b:0   },
  'Brazil':                 { primary:'#009c3b', secondary:'#ffdf00', r:0,   g:156, b:59  },
  'Morocco':                { primary:'#c1272d', secondary:'#006233', r:193, g:39,  b:45  },
  'Haiti':                  { primary:'#00209f', secondary:'#d21034', r:0,   g:32,  b:159 },
  'Scotland':               { primary:'#005eb8', secondary:'#ffffff', r:0,   g:94,  b:184 },
  'United States':          { primary:'#bf0a30', secondary:'#002868', r:191, g:10,  b:48  },
  'Paraguay':               { primary:'#d52b1e', secondary:'#0038a8', r:213, g:43,  b:30  },
  'Australia':              { primary:'#ffcd00', secondary:'#00843d', r:255, g:205, b:0   },
  'Turkey':                 { primary:'#e30a17', secondary:'#ffffff', r:227, g:10,  b:23  },
  'Germany':                { primary:'#dd0000', secondary:'#ffcc00', r:221, g:0,   b:0   },
  'Curaçao':                { primary:'#003da5', secondary:'#f9e300', r:0,   g:61,  b:165 },
  'Ivory Coast':            { primary:'#f77f00', secondary:'#009a44', r:247, g:127, b:0   },
  'Ecuador':                { primary:'#ffd100', secondary:'#003087', r:255, g:209, b:0   },
  'Netherlands':            { primary:'#ff4f00', secondary:'#ffffff', r:255, g:79,  b:0   },
  'Japan':                  { primary:'#bc002d', secondary:'#ffffff', r:188, g:0,   b:45  },
  'Sweden':                 { primary:'#006aa7', secondary:'#fecc02', r:0,   g:106, b:167 },
  'Tunisia':                { primary:'#e70013', secondary:'#ffffff', r:231, g:0,   b:19  },
  'Belgium':                { primary:'#ef3340', secondary:'#000000', r:239, g:51,  b:64  },
  'Egypt':                  { primary:'#ce1126', secondary:'#ffffff', r:206, g:17,  b:38  },
  'Iran':                   { primary:'#239f40', secondary:'#da0000', r:35,  g:159, b:64  },
  'New Zealand':            { primary:'#00247d', secondary:'#cc142b', r:0,   g:36,  b:125 },
  'Spain':                  { primary:'#c60b1e', secondary:'#ffc400', r:198, g:11,  b:30  },
  'Cape Verde':             { primary:'#003893', secondary:'#cf2027', r:0,   g:56,  b:147 },
  'Saudi Arabia':           { primary:'#006c35', secondary:'#ffffff', r:0,   g:108, b:53  },
  'Uruguay':                { primary:'#5aaae7', secondary:'#ffffff', r:90,  g:170, b:231 },
  'France':                 { primary:'#0055a4', secondary:'#ef4135', r:0,   g:85,  b:164 },
  'Senegal':                { primary:'#00853f', secondary:'#fdef42', r:0,   g:133, b:63  },
  'Iraq':                   { primary:'#ce1126', secondary:'#000000', r:206, g:17,  b:38  },
  'Norway':                 { primary:'#ef2b2d', secondary:'#003087', r:239, g:43,  b:45  },
  'Argentina':              { primary:'#74acdf', secondary:'#ffffff', r:116, g:172, b:223 },
  'Algeria':                { primary:'#006233', secondary:'#ffffff', r:0,   g:98,  b:51  },
  'Austria':                { primary:'#ed2939', secondary:'#ffffff', r:237, g:41,  b:57  },
  'Jordan':                 { primary:'#007a3d', secondary:'#ce1126', r:0,   g:122, b:61  },
  'Portugal':               { primary:'#006600', secondary:'#ff0000', r:0,   g:102, b:0   },
  'Congo DR':               { primary:'#007fff', secondary:'#f7d618', r:0,   g:127, b:255 },
  'Uzbekistan':             { primary:'#1eb53a', secondary:'#ce1126', r:30,  g:181, b:58  },
  'Colombia':               { primary:'#fcd116', secondary:'#003087', r:252, g:209, b:22  },
  'England':                { primary:'#cf081f', secondary:'#ffffff', r:207, g:8,   b:31  },
  'Croatia':                { primary:'#ff0000', secondary:'#0c1874', r:255, g:0,   b:0   },
  'Ghana':                  { primary:'#006b3f', secondary:'#fcd116', r:0,   g:107, b:63  },
  'Panama':                 { primary:'#da121a', secondary:'#005293', r:218, g:18,  b:26  },
}

export const DEFAULT_THEME = { primary:'#c8a84b', secondary:'#e8c96d', r:200, g:168, b:75 }

export function getTeamTheme(name) {
  return TEAM_THEMES[name] || DEFAULT_THEME
}

export function applyTeamTheme(teamName) {
  const t = getTeamTheme(teamName)
  const root = document.documentElement
  root.style.setProperty('--team-primary',   t.primary)
  root.style.setProperty('--team-secondary', t.secondary)
  root.style.setProperty('--team-r', t.r)
  root.style.setProperty('--team-g', t.g)
  root.style.setProperty('--team-b', t.b)
  root.style.setProperty('--team-glow',  `rgba(${t.r},${t.g},${t.b},0.22)`)
  root.style.setProperty('--team-glow2', `rgba(${t.r},${t.g},${t.b},0.08)`)
}
