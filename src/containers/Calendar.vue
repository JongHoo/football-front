<template lang="pug">
#calendar
  .search-condition
    v-select.select(:items="seasonList" v-model="selectedSeason" @change="changeLeague")
    v-select.select(:items="leagueList" v-model="selectedLeague" @change="changeLeague")
    v-select.select(:items="teamList" v-model="selectedTeam")
    v-btn(color="info" @click="onSearch") 조회
  .legue-logo-wrapper
    img(:src="getLeagueLogo(nextLeague)" height="50px")
  .table-wrapper
    v-data-table(
    :headers="fields"
    :items="matchList"
    no-data-text="No Data"
    hide-actions
    :loading="isLoading")
      template(slot="items" slot-scope="props")
        td(class="text-xs-center") {{ props.item.round_no }}
        td(class="text-xs-center") {{ props.item.match_dtm }}
        td(class="text-xs-center") {{ props.item.home_team }}
        td(class="text-xs-center") {{ props.item.match_result }}
        td(class="text-xs-center") {{ props.item.away_team }}
  .text-xs-center
    v-dialog(v-model="isDialog" width="300")
      v-card
        v-card-title(class="headline" primary-title) Error
        v-card-text 팀을 선택하세요.
        v-card-actions
          v-spacer
          v-btn(color="green" flat="flat" @click="isDialog=false") OK
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      isLoading: false,
      isDialog: false,
      matchList: [],
      nextLeague: 'premier-league',
      selectedSeason: '18-19',
      selectedLeague: 'premier-league',
      selectedTeam: '',
      teamList: [],
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
      ],
      fields: [
        {
          value: 'round_no',
          text: '라운드',
          width: '100px',
          align: 'center'
        },
        {
          value: 'match_dtm',
          text: '일시',
          width: '100px',
          align: 'center',
          sortable: false
        },
        {
          value: 'home_team',
          text: '홈팀',
          sortable: false,
          align: 'center'
        },
        {
          value: 'match_result',
          text: '스코어',
          width: '100px',
          align: 'center',
          sortable: false
        },
        {
          value: 'away_team',
          text: '원정팀',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  methods: {
    changeLeague () {
      this.teamList = []
      let url = `https://soccer.sportsopendata.net/v1/leagues/${this.selectedLeague}/seasons/${this.selectedSeason}/teams`
      if (!url) {
        return false
      }
      this.$http.get(url)
        .then((res) => {
          if (res.data.data && res.data.data.statusCode === '200') {
            this.teamList.push({text: '선택하세요', value: ''})
            res.data.data.teams.forEach(team => {
              let tempTeam = {
                text: team.name,
                value: team.identifier
              }
              this.teamList.push(tempTeam)
            })
            this.selectedTeam = ''
          }
        })
        .catch(err => {
          console.log(err)
        })
    },

    onSearch () {
      if (!this.selectedTeam) {
        // alert('팀을 선택하세요')
        this.isDialog = true
        return
      }
      this.matchList = []
      this.nextLeague = this.selectedLeague
      let url = `https://soccer.sportsopendata.net/v1/leagues/${this.selectedLeague}/seasons/${this.selectedSeason}/rounds?team_identifier=${this.selectedTeam}`
      if (!url) {
        return false
      }
      this.isLoading = true

      this.$http.get(url)
        .then(res => {
          if (res.data.data && res.data.data.statusCode === '200') {
            res.data.data.rounds.forEach(round => {
              let tempDtm = new Date(round.date_match)
              let korDtm = new Date(tempDtm.setHours(tempDtm.getHours() + 9))
              let tempRound = {
                ...round,
                round_no: round.round_slug.split('-')[1],
                match_dtm: korDtm.toISOString().replace('T', ' ').substr(5, 11)
              }
              this.matchList.push(tempRound)
            })
            this.isLoading = false
          } else {
            this.isLoading = false
          }
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    getLeagueLogo (league) {
      let images = require.context('../assets/logos/', false, /\.png$/)
      return images(`./${league}.png`)
    }
  },

  created () {
    this.changeLeague()
  }
}
</script>

<style lang="less">
 #calendar {
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
