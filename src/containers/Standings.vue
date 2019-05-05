<template lang="pug">
#standings
  .search-condition
    v-select.select(:items="seasonList" v-model="selectedSeason")
    v-select.select(:items="leagueList" v-model="selectedLeague")
    v-btn(color="info" @click="onSearch") 조회
  .legue-logo-wrapper
    img(:src="getLeagueLogo(nextLeague)" height="50px")
  .table-wrapper
    v-data-table(
      :headers="fields"
      :items="teamList"
      no-data-text="No Data"
      hide-actions
      :loading="isLoading")
      template(slot="items" slot-scope="props")
        td(class="text-xs-center") {{ props.item.position }}
        td {{ props.item.team }}
        td(class="text-xs-center") {{ props.item.points }}
        td(class="text-xs-center") {{ props.item.matches_played }}
        td(class="text-xs-center") {{ props.item.wins }}
        td(class="text-xs-center") {{ props.item.draws }}
        td(class="text-xs-center") {{ props.item.losts }}
        td(class="text-xs-center") {{ props.item.scores }}
        td(class="text-xs-center") {{ props.item.conceded }}
        td(class="text-xs-center") {{ props.item.goal_difference }}
</template>

<script>
export default {
  name: 'Standings',
  data () {
    return {
      pagination: {},
      isLoading: false,
      teamList: [],
      nextLeague: 'premier-league',
      selectedSeason: '18-19',
      selectedLeague: 'premier-league',
      leagueLogo: `../assets/logos/${this.selectedLeague}.png`,
      fields: [
        {
          value: 'position',
          text: '순위',
          align: 'center',
          width: '100px',
          fixed: true
        },
        {
          value: 'team',
          text: '팀',
          width: '100px',
          fixed: true
        },
        {
          value: 'points',
          text: '승점',
          align: 'center'
        },
        {
          value: 'matches_played',
          text: '경기',
          align: 'center'
        },
        {
          value: 'wins',
          text: '승',
          align: 'center'
        },
        {
          value: 'draws',
          text: '무',
          align: 'center'
        },
        {
          value: 'losts',
          text: '패',
          align: 'center'
        },
        {
          value: 'scores',
          text: '득점',
          align: 'center'
        },
        {
          value: 'conceded',
          text: '실점',
          align: 'center'
        },
        {
          value: 'goal_difference',
          text: '득실',
          align: 'center'
        }
      ],
      leagueList: [
        {
          text: 'EPL',
          value: 'premier-league'
        },
        {
          text: 'La Liga',
          value: 'liga'
        },
        {
          text: 'Serie A',
          value: 'serie-a'
        },
        {
          text: 'Bundesliga',
          value: 'bundesliga'
        },
        {
          text: 'Ligue 1',
          value: 'ligue1'
        },
        {
          text: 'Eredivisie',
          value: 'eredivisie'
        }
      ],
      seasonList: [
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
      this.nextLeague = this.selectedLeague
      let url = `https://soccer.sportsopendata.net/v1/leagues/${this.selectedLeague}/seasons/${this.selectedSeason}/standings`
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
                ...team.overall
              }
              this.isLoading = false
              this.teamList.push(tempTeam)
            })
          } else {
            this.isLoading = false
          }
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
    },
    getLeagueLogo (league) {
      let images = require.context('../assets/logos/', false, /\.png$/)
      return images(`./${league}.png`)
    }
  }
}
</script>

<style lang="less">
  #standings {
    & > .search-condition {
      margin-bottom: 10px;
      background-image: linear-gradient(to right top, #edf4ff, #c8dcff, #a8c3ff, #8ea9ff, #7a8dff);
      border-radius: 10px;
      padding: 10px;

      & > .select {
        width: 130px;
        margin-left: 10px;
        float: left;
        padding: 0;
        .v-input__control {
          height: 30px;
          min-height: 30px;
        }
      }

      .v-btn {
        position: relative;
      }
    }
  }
</style>
