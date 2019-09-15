import customAxios from './customAxios'
import qs from 'querystring'

const urls = {
  // for User
  getLeagues () {
    return customAxios.get(`leagues`)
  },
  getStandings (league, season) {
    return customAxios.get(`standings/${league}/${season}`)
  },
  getTopStandings (season) {
    return customAxios.get(`standings/top/${season}`)
  },
  getTeams (league, season) {
    return customAxios.get(`teams/${league}/${season}`)
  },
  getMatches (league, season, team) {
    return customAxios.get(`matches/${league}/${season}/${team}`)
  },
  login (loginId, loginPw) {
    return customAxios.post(
      `login`,
      qs.stringify({loginId, loginPw})
    )
  }
}

export default urls
