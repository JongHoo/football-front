<template lang="pug">
#standings
  .search-condition
    b-form-select.select(v-model="selectedLeague" :options="leagueList")
    b-form-select.select(v-model="selectedSeason" :options="seasonList")
    b-button(variant="info" @click="onSearch") 조회
  .table-wrapper
    b-table(
      striped
      bordered
      :items="teamList"
      :fields="fields"
      :busy="isLoading"
    )
      div(slot="table-busy" class="text-center text-info my-2")
        b-spinner.align-middle
          strong Loading...
</template>

<script>
export default {
  name: 'Standings',
  data () {
    return {
      isLoading: false,
      teamList: [],
      fields: [
        {
          key: 'position',
          label: '순위',
          class: 'text-center'
        },
        {
          key: 'team',
          label: '팀'
        },
        {
          key: 'points',
          label: '승점',
          class: 'text-center'
        },
        {
          key: 'matches_played',
          label: '경기',
          class: 'text-center'
        },
        {
          key: 'wins',
          label: '승',
          class: 'text-center'
        },
        {
          key: 'draws',
          label: '무',
          class: 'text-center'
        },
        {
          key: 'losts',
          label: '패',
          class: 'text-center'
        },
        {
          key: 'scores',
          label: '득점',
          class: 'text-center'
        },
        {
          key: 'conceded',
          label: '실점',
          class: 'text-center'
        },
        {
          key: 'goal_difference',
          label: '득실',
          class: 'text-center'
        }
      ],
      selectedLeague: 'EPL',
      selectedSeason: '18-19',
      leagueList: [
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
    onSearch () {
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
      this.isLoading = true
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
              this.isLoading = false
              this.teamList.push(tempTeam)
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="less">
  #standings {
    & > .search-condition {
      margin: 50px 20px 30px 20px;
      padding: 20px 30px;
      background-image: linear-gradient(to right top, #464646, #6d6d6d, #979797, #c4c4c4, #f2f2f2);
      border-radius: 10px;

      & > .select {
        width: 200px;
        margin-right: 10px;
      }
    }

    & > .table-wrapper {
      margin: 0 20px 50px 20px;

      th {
        background-color: lightcyan;
      }
    }
  }
</style>
