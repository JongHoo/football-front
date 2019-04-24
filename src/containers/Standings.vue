<template lang="pug">
#standings
  br
  b-container
    b-row(align-h="start")
      b-col(md="6")
      b-col(md="3")
        b-row
          b-col.vertical-center(md="4")
            span League :
          b-col.vertical-center(md="6")
            b-form-select(v-model="selectedLeague" :options="leagueList" @change="changeCondition")
      b-col(md="3")
        b-row
          b-col.vertical-center(md="4")
            span Season :
          b-col.vertical-center(md="6")
            b-form-select(v-model="selectedSeason" :options="seasonList" @change="changeCondition")
    br
    div
      b-table(
        striped
        hover
        :items="teamList"
        :fields="fields"
      )
</template>

<script>
export default {
  name: 'Standings',
  data () {
    return {
      teamList: [],
      fields: [
        {
          key: 'position'
        },
        {
          key: 'team'
        },
        {
          key: 'points'
        },
        {
          key: 'matches_played',
          label: 'matches'
        },
        {
          key: 'wins'
        },
        {
          key: 'draws'
        },
        {
          key: 'losts'
        },
        {
          key: 'scores'
        },
        {
          key: 'conceded'
        },
        {
          key: 'goal_difference',
          label: 'goal diff'
        }
      ],
      selectedLeague: '',
      selectedSeason: '18-19',
      leagueList: [
        {
          text: 'SELECT',
          value: ''
        },
        {
          text: 'EPL',
          value: 'EPL'
        },
        {
          text: 'La Liga',
          value: 'LALIGA'
        },
        {
          text: 'Serie A',
          value: 'SERIEA'
        },
        {
          text: 'Eredivisie',
          value: 'EREDIVISIE'
        }
      ],
      seasonList: [
        {
          text: '16-17',
          value: '16-17'
        },
        {
          text: '17-18',
          value: '17-18'
        },
        {
          text: '18-19',
          value: '18-19'
        }
      ]
    }
  },
  methods: {
    changeCondition () {
      this.teamList = []
      const option = this.selectedLeague
      let url = null
      switch (option) {
        case 'EPL':
          url = `http://soccer.sportsopendata.net/v1/leagues/premier-league/seasons/${this.selectedSeason}/standings`
          break
        case 'LALIGA':
          url = `http://soccer.sportsopendata.net/v1/leagues/liga/seasons/${this.selectedSeason}/standings`
          break
        case 'SERIEA':
          url = `http://soccer.sportsopendata.net/v1/leagues/serie-a/seasons/${this.selectedSeason}/standings`
          break
        case 'EREDIVISIE':
          url = `http://soccer.sportsopendata.net/v1/leagues/eredivisie/seasons/${this.selectedSeason}/standings`
          break
        default:
          url = ''
      }
      if (!url) {
        return false
      }
      this.$http.get(url)
        .then((res) => {
          if (res.data.data && res.data.data.statusCode === '200') {
            let standings = res.data.data.standings
            standings.forEach((team) => {
              let tempTeam = {
                ...team,
                wins: team.overall.wins,
                losts: team.overall.losts,
                draws: team.overall.draws,
                scores: team.overall.scores,
                conceded: team.overall.conceded,
                matches_played: team.overall.matches_played,
                points: team.overall.points,
                goal_difference: team.overall.goal_difference
              }
              this.teamList.push(tempTeam)
            })
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
  .vertical-center {
    display: flex;
    align-items: center;
  }
</style>
