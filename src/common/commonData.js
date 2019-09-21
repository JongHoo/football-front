const commData = {
  seasonList () {
    let seasonList = []
    let currentYear = Number((new Date()).toISOString().substr(2, 2))
    const currentMonth = Number((new Date()).toISOString().substr(5, 2))
    if (currentMonth < 8) {
      currentYear -= 1
    }
    for (let i = 17; i <= currentYear; i++) {
      seasonList.push({
        text: `${i}-${i + 1}`,
        value: `${i}-${i + 1}`
      })
    }
    return seasonList
  },
  currentSeason () {
    let currentYear = Number((new Date()).toISOString().substr(2, 2))
    const currentMonth = Number((new Date()).toISOString().substr(5, 2))
    if (currentMonth < 8) {
      currentYear -= 1
    }
    return `${currentYear}-${currentYear + 1}`
  },
  leagueList () {
    const leagueList = [
      {
        value: 'bundesliga',
        text: 'Bundesliga'
      },
      {
        value: 'premier-league',
        text: 'EPL'
      },
      {
        value: 'eredivisie',
        text: 'Eredivisie'
      },
      {
        value: 'liga',
        text: 'La Liga'
      },
      {
        value: 'ligue1',
        text: 'Ligue 1'
      },
      {
        value: 'serie-a',
        text: 'Serie A'
      }
    ]
    return leagueList
  }
}

export default commData
