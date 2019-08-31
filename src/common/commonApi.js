import axios from 'axios'
import qs from 'querystring'

const urls = {
  // for User
  getLeagues () {
    return axios.get('https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev/leagues')
  },
  getStandings (league, season) {
    return axios.get(`https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev/standings/${league}/${season}`)
  },
  getTeams (league, season) {
    return axios.get(`https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev/teams/${league}/${season}`)
  },
  getMatches (league, season, team) {
    return axios.get(`https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev/matches/${league}/${season}/${team}`)
  },
  // for Admin
  updateTeams (league, season) {
    return axios.post(`https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev/teams/${league}/${season}`)
  },
  updateStandings (league, season) {
    return axios.post(
      'https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev/standings',
      qs.stringify({league, season})
    )
  },
  updateMatches (league, season) {
    return axios.post(`https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev/matches/${league}/${season}`)
  },
  login (loginId, loginPw) {
    return axios.post(
      'https://uqy00myv2i.execute-api.ap-northeast-2.amazonaws.com/dev/login',
      qs.stringify({loginId, loginPw})
    )
  }
}

export default urls
