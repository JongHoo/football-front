<template lang="pug">
#standings
  .search-condition
    v-select.select(:items="seasonList" v-model="selectedSeason")
    v-select.select(:items="leagueList" v-model="selectedLeague")
    v-btn(color="info" @click="onSearch") 조회
  .legue-logo-wrapper
    img(:src="getLeagueLogo(nextLeague)" height="50px")
  .table-wrapper
    v-data-table(:headers="fields" :items="teamList" no-data-text="No Data" hide-actions :loading="isLoading")
      template(slot="items" slot-scope="props")
        td.text-xs-center(:class="getTeamCtgry(nextLeague, props.item.position)") {{ props.item.position }}
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
import commonApi from '../common/commonApi'
import commonData from '../common/commonData'

export default {
  name: 'Standings',
  data () {
    return {
      leagueList: commonData.leagueList(),
      seasonList: commonData.seasonList(),
      pagination: {},
      isLoading: false,
      teamList: [],
      nextLeague: 'premier-league',
      selectedSeason: '19-20',
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
      ]
    }
  },
  methods: {
    onSearch () {
      this.teamList = []
      this.nextLeague = this.selectedLeague
      this.isLoading = true

      commonApi.getStandings(this.selectedLeague, this.selectedSeason)
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
    getTeamCtgry (league, position) {
      if (['premier-league', 'serie-a', 'liga'].includes(league)) {
        if (position <= 4) {
          return 'CHAMPIONS_LEAGUE'
        }
        if (position >= 18) {
          return 'DEMOTE'
        }
      } else if (league === 'bundesliga') {
        if (position <= 4) {
          return 'CHAMPIONS_LEAGUE'
        }
        if (position >= 17) {
          return 'DEMOTE'
        }
        if (position === 16) {
          return 'DEMOTE_PLAYOFF'
        }
      } else if (league === 'ligue1') {
        if (position <= 3) {
          return 'CHAMPIONS_LEAGUE'
        }
        if (position >= 18) {
          return 'DEMOTE'
        }
      } else if (league === 'eredivisie') {
        if (position <= 2) {
          return 'CHAMPIONS_LEAGUE'
        }
        if (position === 18) {
          return 'DEMOTE'
        }
        if (position === 16 || position === 17) {
          return 'DEMOTE_PLAYOFF'
        }
      }
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
    & > .table-wrapper {
      .CHAMPIONS_LEAGUE {
        background-image: linear-gradient(to right, #53b5ff, #99c4ff, #c6d5ff, #e7e9ff, #ffffff);
      }
      .DEMOTE {
        background-image: linear-gradient(to right, #6c6c6c, #8f8f8f, #b3b3b3, #d8d8d8, #ffffff);
      }
      .DEMOTE_PLAYOFF {
        background-image: linear-gradient(to right, #aeaeae, #c2c2c2, #d6d6d6, #eaeaea, #ffffff);
      }
    }
  }
</style>
