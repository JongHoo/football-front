import axios from 'axios'

const urls = {
  getLeagues: () => {
    return axios.get('https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/leagues')
  },
  getStandings: (league, season) => {
    return axios.get(`https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/standings/${league}/${season}`)
  },
  getTeams: (league, season) => {
    return axios.get(`https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/teams/${league}/${season}`)
  },
  getMatches: (league, season, team) => {
    return axios.get(`https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/matches/${league}/${season}/${team}`)
  }
}

export default urls
