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
        td.text-xs-center(v-bind:class="getUefaCtgry(nextLeague, props.item.position)") {{ props.item.position }}
        td {{ props.item.team }}
        td.text-xs-center {{ props.item.points }}
        td.text-xs-center {{ props.item.matches_played }}
        td.text-xs-center {{ props.item.wins }}
        td.text-xs-center {{ props.item.draws }}
        td.text-xs-center {{ props.item.losts }}
        td.text-xs-center {{ props.item.scores }}
        td.text-xs-center {{ props.item.conceded }}
        td.text-xs-center {{ props.item.goal_difference }}
</template>

<script>
export default {
  name: 'Standings',
  data () {
    return {
      LEAGUE_URL: 'https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/leagues',
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
      leagueList: [],
      seasonList: [
        {
          text: '17-18',
          value: '17-18'
        },
        {
          text: '18-19',
          value: '18-19'
        }
      ],
      c4Leagues: [
        'premier-league',
        'liga',
        'bundesliga',
        'serie-a'
      ],
      c3Leagues: [
        'ligue1'
      ],
      c2Leagues: [
        'eredivisie'
      ]
    }
  },
  methods: {
    onSearch () {
      this.teamList = []
      this.nextLeague = this.selectedLeague
      let url = `https://3y4mhvmwq3.execute-api.ap-northeast-2.amazonaws.com/dev/standings/${this.selectedLeague}/${this.selectedSeason}`
      if (!url) {
        return false
      }
      this.isLoading = true

      this.$http.get(url)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            let standings = res.data
            standings.forEach((team) => {
              this.isLoading = false
              this.teamList.push(team)
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
    },
    getLeagueList () {
      this.$http.get(this.LEAGUE_URL)
        .then(res => {
          res.data.forEach(item => {
            this.leagueList.push(
              {
                text: item.name,
                value: item.league_id
              }
            )
          })
          this.selectedLeague = 'premier-league'
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    getUefaCtgry (league, position) {
      if (this.c4Leagues.includes(league)) {
        if (position <= 4) {
          return 'CHAMPIONS_LEAGUE'
        }
      } else if (this.c3Leagues.includes(league)) {
        if (position <= 3) {
          return 'CHAMPIONS_LEAGUE'
        }
      } else if (this.c2Leagues.includes(league)) {
        if (position <= 2) {
          return 'CHAMPIONS_LEAGUE'
        }
      } else {
        return 'NA'
      }
    }
  },
  created () {
    this.getLeagueList()
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
    & > .table-wrapper {
      .CHAMPIONS_LEAGUE {
        background-image: linear-gradient(to right, #53b5ff, #99c4ff, #c6d5ff, #e7e9ff, #ffffff);
      }
    }
  }
</style>
