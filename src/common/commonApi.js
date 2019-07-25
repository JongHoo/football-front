import axios from 'axios'

const urls = {
  // for User
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
  },
  // for Admin
  updateTeams: (league, season) => {
    return axios.post(`https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/teams/${league}/${season}`)
  },
  updateStandings: (league, season) => {
    return axios.post(`https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/standings/${league}/${season}`)
  },
  updateMatches: (league, season) => {
    return axios.post(`https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/matches/${league}/${season}`)
  }
}

export default urls
