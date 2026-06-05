export const TOURNAMENT = {
  name: 'FIFA World Cup 2026',
  hosts: ['United States', 'Canada', 'Mexico'],
  startDate: 'June 11, 2026',
  finalDate: 'July 19, 2026',
  venue: 'MetLife Stadium, New Jersey',
  teams: 48,
  matches: 104,
  groups: 12,
}

export const FLAGS = {
  'Mexico': '🇲🇽', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷', 'Czechia': '🇨🇿',
  'Canada': '🇨🇦', 'Bosnia and Herzegovina': '🇧🇦', 'Qatar': '🇶🇦', 'Switzerland': '🇨🇭',
  'Brazil': '🇧🇷', 'Morocco': '🇲🇦', 'Haiti': '🇭🇹', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'United States': '🇺🇸', 'Paraguay': '🇵🇾', 'Australia': '🇦🇺', 'Turkey': '🇹🇷',
  'Germany': '🇩🇪', 'Curaçao': '🇨🇼', 'Ivory Coast': '🇨🇮', 'Ecuador': '🇪🇨',
  'Netherlands': '🇳🇱', 'Japan': '🇯🇵', 'Sweden': '🇸🇪', 'Tunisia': '🇹🇳',
  'Belgium': '🇧🇪', 'Egypt': '🇪🇬', 'Iran': '🇮🇷', 'New Zealand': '🇳🇿',
  'Spain': '🇪🇸', 'Cape Verde': '🇨🇻', 'Saudi Arabia': '🇸🇦', 'Uruguay': '🇺🇾',
  'France': '🇫🇷', 'Senegal': '🇸🇳', 'Iraq': '🇮🇶', 'Norway': '🇳🇴',
  'Argentina': '🇦🇷', 'Algeria': '🇩🇿', 'Austria': '🇦🇹', 'Jordan': '🇯🇴',
  'Portugal': '🇵🇹', 'Congo DR': '🇨🇩', 'Uzbekistan': '🇺🇿', 'Colombia': '🇨🇴',
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Croatia': '🇭🇷', 'Ghana': '🇬🇭', 'Panama': '🇵🇦',
}

// FIFA Rankings (approximate)
export const RANKINGS = {
  'Spain': 1, 'France': 2, 'England': 3, 'Argentina': 4,
  'Brazil': 5, 'Portugal': 6, 'Netherlands': 7, 'Belgium': 8,
  'Germany': 9, 'Uruguay': 10, 'Japan': 12, 'Colombia': 13,
  'Morocco': 14, 'Switzerland': 15, 'Croatia': 17, 'Mexico': 18,
  'Senegal': 19, 'Ecuador': 20, 'South Korea': 22, 'Austria': 25,
  'Norway': 26, 'Sweden': 27, 'Australia': 30, 'United States': 11,
  'Canada': 40, 'Tunisia': 34, 'Algeria': 36, 'Egypt': 37,
  'Ivory Coast': 42, 'Saudi Arabia': 56, 'Iran': 22, 'New Zealand': 95,
  'South Africa': 68, 'Czechia': 38, 'Ghana': 60, 'Qatar': 37,
  'Bosnia and Herzegovina': 55, 'Scotland': 39, 'Haiti': 80,
  'Turkey': 31, 'Paraguay': 66, 'Iraq': 71, 'Jordan': 87,
  'Cape Verde': 77, 'Bolivia': 85, 'Congo DR': 62, 'Uzbekistan': 78,
  'Panama': 72, 'Curaçao': 82, 'England': 4,
}

export const GROUPS = [
  {
    id: 'A', color: '#ef4444',
    teams: [
      { name: 'Mexico', flag: '🇲🇽', rank: 18, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'South Africa', flag: '🇿🇦', rank: 68, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'South Korea', flag: '🇰🇷', rank: 22, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Czechia', flag: '🇨🇿', rank: 38, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 11', time: '15:00 ET', home: 'Mexico', away: 'South Africa', venue: 'Azteca, Mexico City', homeScore: null, awayScore: null },
      { date: 'Jun 11', time: '22:00 ET', home: 'South Korea', away: 'Czechia', venue: 'Estadio Akron, Guadalajara', homeScore: null, awayScore: null },
      { date: 'Jun 17', time: '15:00 ET', home: 'Mexico', away: 'South Korea', venue: 'Azteca, Mexico City', homeScore: null, awayScore: null },
      { date: 'Jun 17', time: '12:00 ET', home: 'South Africa', away: 'Czechia', venue: 'Estadio Monterrey', homeScore: null, awayScore: null },
      { date: 'Jun 21', time: '18:00 ET', home: 'Mexico', away: 'Czechia', venue: 'Azteca, Mexico City', homeScore: null, awayScore: null },
      { date: 'Jun 21', time: '18:00 ET', home: 'South Africa', away: 'South Korea', venue: 'Estadio Akron, Guadalajara', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'B', color: '#f97316',
    teams: [
      { name: 'Canada', flag: '🇨🇦', rank: 40, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Bosnia and Herzegovina', flag: '🇧🇦', rank: 55, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Qatar', flag: '🇶🇦', rank: 37, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Switzerland', flag: '🇨🇭', rank: 15, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 12', time: '15:00 ET', home: 'Canada', away: 'Bosnia and Herzegovina', venue: 'BMO Field, Toronto', homeScore: null, awayScore: null },
      { date: 'Jun 13', time: '12:00 ET', home: 'Qatar', away: 'Switzerland', venue: 'BC Place, Vancouver', homeScore: null, awayScore: null },
      { date: 'Jun 17', time: '18:00 ET', home: 'Canada', away: 'Qatar', venue: 'BMO Field, Toronto', homeScore: null, awayScore: null },
      { date: 'Jun 18', time: '12:00 ET', home: 'Bosnia and Herzegovina', away: 'Switzerland', venue: 'BC Place, Vancouver', homeScore: null, awayScore: null },
      { date: 'Jun 22', time: '18:00 ET', home: 'Canada', away: 'Switzerland', venue: 'BMO Field, Toronto', homeScore: null, awayScore: null },
      { date: 'Jun 22', time: '18:00 ET', home: 'Bosnia and Herzegovina', away: 'Qatar', venue: 'BC Place, Vancouver', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'C', color: '#eab308',
    teams: [
      { name: 'Brazil', flag: '🇧🇷', rank: 5, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Morocco', flag: '🇲🇦', rank: 14, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Haiti', flag: '🇭🇹', rank: 80, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', rank: 39, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 13', time: '18:00 ET', home: 'Brazil', away: 'Haiti', venue: 'SoFi Stadium, Los Angeles', homeScore: null, awayScore: null },
      { date: 'Jun 14', time: '15:00 ET', home: 'Morocco', away: 'Scotland', venue: 'Lumen Field, Seattle', homeScore: null, awayScore: null },
      { date: 'Jun 18', time: '15:00 ET', home: 'Brazil', away: 'Scotland', venue: 'SoFi Stadium, Los Angeles', homeScore: null, awayScore: null },
      { date: 'Jun 18', time: '18:00 ET', home: 'Morocco', away: 'Haiti', venue: 'Lumen Field, Seattle', homeScore: null, awayScore: null },
      { date: 'Jun 22', time: '21:00 ET', home: 'Brazil', away: 'Morocco', venue: 'SoFi Stadium, Los Angeles', homeScore: null, awayScore: null },
      { date: 'Jun 22', time: '21:00 ET', home: 'Haiti', away: 'Scotland', venue: 'Lumen Field, Seattle', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'D', color: '#22c55e',
    teams: [
      { name: 'United States', flag: '🇺🇸', rank: 11, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Paraguay', flag: '🇵🇾', rank: 66, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Australia', flag: '🇦🇺', rank: 30, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Turkey', flag: '🇹🇷', rank: 31, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 12', time: '21:00 ET', home: 'United States', away: 'Paraguay', venue: 'SoFi Stadium, Los Angeles', homeScore: null, awayScore: null },
      { date: 'Jun 13', time: '21:00 ET', home: 'Australia', away: 'Turkey', venue: 'AT&T Stadium, Dallas', homeScore: null, awayScore: null },
      { date: 'Jun 17', time: '21:00 ET', home: 'United States', away: 'Australia', venue: 'SoFi Stadium, Los Angeles', homeScore: null, awayScore: null },
      { date: 'Jun 18', time: '21:00 ET', home: 'Paraguay', away: 'Turkey', venue: 'AT&T Stadium, Dallas', homeScore: null, awayScore: null },
      { date: 'Jun 23', time: '18:00 ET', home: 'United States', away: 'Turkey', venue: 'SoFi Stadium, Los Angeles', homeScore: null, awayScore: null },
      { date: 'Jun 23', time: '18:00 ET', home: 'Australia', away: 'Paraguay', venue: 'AT&T Stadium, Dallas', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'E', color: '#06b6d4',
    teams: [
      { name: 'Germany', flag: '🇩🇪', rank: 9, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Curaçao', flag: '🇨🇼', rank: 82, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Ivory Coast', flag: '🇨🇮', rank: 42, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Ecuador', flag: '🇪🇨', rank: 20, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 14', time: '12:00 ET', home: 'Germany', away: 'Ecuador', venue: 'Gillette Stadium, Boston', homeScore: null, awayScore: null },
      { date: 'Jun 14', time: '18:00 ET', home: 'Ivory Coast', away: 'Curaçao', venue: 'Arrowhead, Kansas City', homeScore: null, awayScore: null },
      { date: 'Jun 19', time: '12:00 ET', home: 'Germany', away: 'Ivory Coast', venue: 'Gillette Stadium, Boston', homeScore: null, awayScore: null },
      { date: 'Jun 19', time: '15:00 ET', home: 'Ecuador', away: 'Curaçao', venue: 'Arrowhead, Kansas City', homeScore: null, awayScore: null },
      { date: 'Jun 23', time: '21:00 ET', home: 'Germany', away: 'Curaçao', venue: 'Gillette Stadium, Boston', homeScore: null, awayScore: null },
      { date: 'Jun 23', time: '21:00 ET', home: 'Ecuador', away: 'Ivory Coast', venue: 'Arrowhead, Kansas City', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'F', color: '#8b5cf6',
    teams: [
      { name: 'Netherlands', flag: '🇳🇱', rank: 7, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Japan', flag: '🇯🇵', rank: 12, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Sweden', flag: '🇸🇪', rank: 27, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Tunisia', flag: '🇹🇳', rank: 34, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 15', time: '12:00 ET', home: 'Netherlands', away: 'Sweden', venue: 'Lincoln Financial, Philadelphia', homeScore: null, awayScore: null },
      { date: 'Jun 15', time: '15:00 ET', home: 'Japan', away: 'Tunisia', venue: 'Hard Rock Stadium, Miami', homeScore: null, awayScore: null },
      { date: 'Jun 19', time: '18:00 ET', home: 'Netherlands', away: 'Japan', venue: 'Lincoln Financial, Philadelphia', homeScore: null, awayScore: null },
      { date: 'Jun 19', time: '21:00 ET', home: 'Sweden', away: 'Tunisia', venue: 'Hard Rock Stadium, Miami', homeScore: null, awayScore: null },
      { date: 'Jun 24', time: '15:00 ET', home: 'Netherlands', away: 'Tunisia', venue: 'Lincoln Financial, Philadelphia', homeScore: null, awayScore: null },
      { date: 'Jun 24', time: '15:00 ET', home: 'Japan', away: 'Sweden', venue: 'Hard Rock Stadium, Miami', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'G', color: '#ec4899',
    teams: [
      { name: 'Belgium', flag: '🇧🇪', rank: 8, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Egypt', flag: '🇪🇬', rank: 37, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Iran', flag: '🇮🇷', rank: 22, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'New Zealand', flag: '🇳🇿', rank: 95, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 15', time: '18:00 ET', home: 'Belgium', away: 'Iran', venue: 'MetLife Stadium, NY/NJ', homeScore: null, awayScore: null },
      { date: 'Jun 16', time: '12:00 ET', home: 'Egypt', away: 'New Zealand', venue: 'Levi\'s Stadium, San Francisco', homeScore: null, awayScore: null },
      { date: 'Jun 20', time: '12:00 ET', home: 'Belgium', away: 'Egypt', venue: 'MetLife Stadium, NY/NJ', homeScore: null, awayScore: null },
      { date: 'Jun 20', time: '15:00 ET', home: 'Iran', away: 'New Zealand', venue: 'Levi\'s Stadium, San Francisco', homeScore: null, awayScore: null },
      { date: 'Jun 24', time: '18:00 ET', home: 'Belgium', away: 'New Zealand', venue: 'MetLife Stadium, NY/NJ', homeScore: null, awayScore: null },
      { date: 'Jun 24', time: '18:00 ET', home: 'Egypt', away: 'Iran', venue: 'Levi\'s Stadium, San Francisco', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'H', color: '#14b8a6',
    teams: [
      { name: 'Spain', flag: '🇪🇸', rank: 1, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Cape Verde', flag: '🇨🇻', rank: 77, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Saudi Arabia', flag: '🇸🇦', rank: 56, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Uruguay', flag: '🇺🇾', rank: 10, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 15', time: '21:00 ET', home: 'Spain', away: 'Uruguay', venue: 'NRG Stadium, Houston', homeScore: null, awayScore: null },
      { date: 'Jun 16', time: '15:00 ET', home: 'Saudi Arabia', away: 'Cape Verde', venue: 'Children\'s Mercy Park, Kansas City', homeScore: null, awayScore: null },
      { date: 'Jun 20', time: '18:00 ET', home: 'Spain', away: 'Saudi Arabia', venue: 'NRG Stadium, Houston', homeScore: null, awayScore: null },
      { date: 'Jun 20', time: '21:00 ET', home: 'Uruguay', away: 'Cape Verde', venue: 'Children\'s Mercy Park, Kansas City', homeScore: null, awayScore: null },
      { date: 'Jun 25', time: '12:00 ET', home: 'Spain', away: 'Cape Verde', venue: 'NRG Stadium, Houston', homeScore: null, awayScore: null },
      { date: 'Jun 25', time: '12:00 ET', home: 'Uruguay', away: 'Saudi Arabia', venue: 'Children\'s Mercy Park, Kansas City', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'I', color: '#f59e0b',
    teams: [
      { name: 'France', flag: '🇫🇷', rank: 2, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Senegal', flag: '🇸🇳', rank: 19, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Iraq', flag: '🇮🇶', rank: 71, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Norway', flag: '🇳🇴', rank: 26, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 16', time: '18:00 ET', home: 'France', away: 'Iraq', venue: 'AT&T Stadium, Dallas', homeScore: null, awayScore: null },
      { date: 'Jun 16', time: '21:00 ET', home: 'Senegal', away: 'Norway', venue: 'Arrowhead, Kansas City', homeScore: null, awayScore: null },
      { date: 'Jun 21', time: '12:00 ET', home: 'France', away: 'Senegal', venue: 'AT&T Stadium, Dallas', homeScore: null, awayScore: null },
      { date: 'Jun 21', time: '15:00 ET', home: 'Norway', away: 'Iraq', venue: 'Arrowhead, Kansas City', homeScore: null, awayScore: null },
      { date: 'Jun 25', time: '15:00 ET', home: 'France', away: 'Norway', venue: 'AT&T Stadium, Dallas', homeScore: null, awayScore: null },
      { date: 'Jun 25', time: '15:00 ET', home: 'Iraq', away: 'Senegal', venue: 'Arrowhead, Kansas City', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'J', color: '#6366f1',
    teams: [
      { name: 'Argentina', flag: '🇦🇷', rank: 4, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Algeria', flag: '🇩🇿', rank: 36, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Austria', flag: '🇦🇹', rank: 25, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Jordan', flag: '🇯🇴', rank: 87, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 16', time: '12:00 ET', home: 'Argentina', away: 'Algeria', venue: 'MetLife Stadium, NY/NJ', homeScore: null, awayScore: null },
      { date: 'Jun 16', time: '18:00 ET', home: 'Austria', away: 'Jordan', venue: 'Rose Bowl, Los Angeles', homeScore: null, awayScore: null },
      { date: 'Jun 21', time: '21:00 ET', home: 'Argentina', away: 'Austria', venue: 'MetLife Stadium, NY/NJ', homeScore: null, awayScore: null },
      { date: 'Jun 21', time: '18:00 ET', home: 'Algeria', away: 'Jordan', venue: 'Rose Bowl, Los Angeles', homeScore: null, awayScore: null },
      { date: 'Jun 25', time: '18:00 ET', home: 'Argentina', away: 'Jordan', venue: 'MetLife Stadium, NY/NJ', homeScore: null, awayScore: null },
      { date: 'Jun 25', time: '18:00 ET', home: 'Austria', away: 'Algeria', venue: 'Rose Bowl, Los Angeles', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'K', color: '#84cc16',
    teams: [
      { name: 'Portugal', flag: '🇵🇹', rank: 6, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Congo DR', flag: '🇨🇩', rank: 62, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Uzbekistan', flag: '🇺🇿', rank: 78, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Colombia', flag: '🇨🇴', rank: 13, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 17', time: '12:00 ET', home: 'Portugal', away: 'Colombia', venue: 'Lincoln Financial, Philadelphia', homeScore: null, awayScore: null },
      { date: 'Jun 17', time: '15:00 ET', home: 'Uzbekistan', away: 'Congo DR', venue: 'Mercedes-Benz, Atlanta', homeScore: null, awayScore: null },
      { date: 'Jun 22', time: '12:00 ET', home: 'Portugal', away: 'Uzbekistan', venue: 'Lincoln Financial, Philadelphia', homeScore: null, awayScore: null },
      { date: 'Jun 22', time: '15:00 ET', home: 'Colombia', away: 'Congo DR', venue: 'Mercedes-Benz, Atlanta', homeScore: null, awayScore: null },
      { date: 'Jun 26', time: '15:00 ET', home: 'Portugal', away: 'Congo DR', venue: 'Lincoln Financial, Philadelphia', homeScore: null, awayScore: null },
      { date: 'Jun 26', time: '15:00 ET', home: 'Colombia', away: 'Uzbekistan', venue: 'Mercedes-Benz, Atlanta', homeScore: null, awayScore: null },
    ]
  },
  {
    id: 'L', color: '#f43f5e',
    teams: [
      { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rank: 3, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Croatia', flag: '🇭🇷', rank: 17, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Ghana', flag: '🇬🇭', rank: 60, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
      { name: 'Panama', flag: '🇵🇦', rank: 72, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
    ],
    matches: [
      { date: 'Jun 17', time: '21:00 ET', home: 'England', away: 'Panama', venue: 'Hard Rock Stadium, Miami', homeScore: null, awayScore: null },
      { date: 'Jun 18', time: '15:00 ET', home: 'Croatia', away: 'Ghana', venue: 'Allegiant Stadium, Las Vegas', homeScore: null, awayScore: null },
      { date: 'Jun 22', time: '21:00 ET', home: 'England', away: 'Croatia', venue: 'Hard Rock Stadium, Miami', homeScore: null, awayScore: null },
      { date: 'Jun 23', time: '12:00 ET', home: 'Panama', away: 'Ghana', venue: 'Allegiant Stadium, Las Vegas', homeScore: null, awayScore: null },
      { date: 'Jun 26', time: '18:00 ET', home: 'England', away: 'Ghana', venue: 'Hard Rock Stadium, Miami', homeScore: null, awayScore: null },
      { date: 'Jun 26', time: '18:00 ET', home: 'Croatia', away: 'Panama', venue: 'Allegiant Stadium, Las Vegas', homeScore: null, awayScore: null },
    ]
  },
]

export const VENUES = [
  { name: 'MetLife Stadium', city: 'East Rutherford, NJ', country: 'USA', capacity: 82500, matches: 8, final: true },
  { name: 'SoFi Stadium', city: 'Inglewood, CA', country: 'USA', capacity: 70240, matches: 8 },
  { name: 'AT&T Stadium', city: 'Arlington, TX', country: 'USA', capacity: 80000, matches: 8 },
  { name: 'Hard Rock Stadium', city: 'Miami, FL', country: 'USA', capacity: 65326, matches: 8 },
  { name: 'NRG Stadium', city: 'Houston, TX', country: 'USA', capacity: 72220, matches: 8 },
  { name: 'Lincoln Financial Field', city: 'Philadelphia, PA', country: 'USA', capacity: 69176, matches: 8 },
  { name: 'Lumen Field', city: 'Seattle, WA', country: 'USA', capacity: 72000, matches: 7 },
  { name: 'Rose Bowl', city: 'Pasadena, CA', country: 'USA', capacity: 92542, matches: 8 },
  { name: 'Gillette Stadium', city: 'Foxborough, MA', country: 'USA', capacity: 64628, matches: 7 },
  { name: "Levi's Stadium", city: 'Santa Clara, CA', country: 'USA', capacity: 68500, matches: 7 },
  { name: 'Arrowhead Stadium', city: 'Kansas City, MO', country: 'USA', capacity: 76416, matches: 7 },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta, GA', country: 'USA', capacity: 71000, matches: 8 },
  { name: 'BMO Field', city: 'Toronto, ON', country: 'Canada', capacity: 30000, matches: 7 },
  { name: 'BC Place', city: 'Vancouver, BC', country: 'Canada', capacity: 54500, matches: 6 },
  { name: 'Estadio Azteca', city: 'Mexico City', country: 'Mexico', capacity: 87523, matches: 5 },
  { name: 'Estadio BBVA', city: 'Monterrey', country: 'Mexico', capacity: 53464, matches: 4 },
  { name: 'Estadio Akron', city: 'Guadalajara', country: 'Mexico', capacity: 49850, matches: 4 },
]

export const CONTENDERS = [
  { name: 'Spain', flag: '🇪🇸', rank: 1, odds: '+350', group: 'H', color: '#ef4444', strength: 95 },
  { name: 'Argentina', flag: '🇦🇷', rank: 4, odds: '+400', group: 'J', color: '#74b3f0', strength: 93, defending: true },
  { name: 'France', flag: '🇫🇷', rank: 2, odds: '+450', group: 'I', color: '#3b82f6', strength: 92 },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', rank: 3, odds: '+500', group: 'L', color: '#f59e0b', strength: 89 },
  { name: 'Brazil', flag: '🇧🇷', rank: 5, odds: '+600', group: 'C', color: '#eab308', strength: 87 },
  { name: 'Germany', flag: '🇩🇪', rank: 9, odds: '+700', group: 'E', color: '#6b7280', strength: 84 },
  { name: 'Portugal', flag: '🇵🇹', rank: 6, odds: '+800', group: 'K', color: '#22c55e', strength: 86 },
  { name: 'Netherlands', flag: '🇳🇱', rank: 7, odds: '+900', group: 'F', color: '#f97316', strength: 83 },
]
