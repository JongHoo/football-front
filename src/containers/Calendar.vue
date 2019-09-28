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
    v-data-table(:headers="fields" :items="matchList" no-data-text="No Data" hide-actions :loading="isLoading")
      template(slot="items" slot-scope="props")
        td.text-xs-center {{ props.item.round }}
        td.text-xs-center {{ props.item.match_dtm }}
        td.text-xs-center {{ props.item.counter_team }}
        td.text-xs-center(:class="getResultColor(props.item)") {{ props.item.match_result }}
  modal(name="alert-modal" width="300" height="auto")
    alert-modal(title="Error" content="팀을 선택하세요." @close="closeAlertModal")
</template>

<script>
import commonApi from '../common/commonApi'
import commonData from '../common/commonData'
import AlertModal from '../modals/alertModal'

export default {
  name: 'Calendar',
  components: { AlertModal },
  data () {
    return {
      leagueList: commonData.leagueList(),
      seasonList: commonData.seasonList(),
      isLoading: false,
      matchList: [],
      nextLeague: 'premier-league',
      selectedSeason: '19-20',
      selectedLeague: 'premier-league',
      selectedTeam: '',
      selectedTeamObj: {},
      teamList: [],
      fields: [
        {
          value: 'round',
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
          value: 'counter_team',
          text: '상대팀',
          sortable: false,
          align: 'center'
        },
        {
          value: 'match_result',
          text: '스코어',
          width: '100px',
          align: 'center',
          sortable: false
        }
      ]
    }
  },
  methods: {
    changeLeague () {
      this.teamList = [{text: 'loading...', value: ''}]
      commonApi.getTeams(this.selectedLeague, this.selectedSeason)
        .then((res) => {
          if (res && res.data) {
            this.teamList = []
            this.teamList.push({text: '선택하세요', value: ''})
            res.data.forEach(team => {
              let tempTeam = {
                text: team.name,
                value: team.name
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
        this.$modal.show('alert-modal')
        return
      }

      this.matchList = []
      this.nextLeague = this.selectedLeague
      this.isLoading = true

      commonApi.getMatches(this.selectedLeague, this.selectedSeason, this.selectedTeam)
        .then(res => {
          this.changeSelectedTeamObj()
          if (res.data && res.data.length > 0) {
            res.data.forEach(round => {
              let tempDtm = new Date(round.date_match)
              let korDtm = new Date(tempDtm.setHours(tempDtm.getHours() + 9))
              let counterTeam = round.home_team === this.selectedTeamObj.text ? round.away_team : round.home_team
              let homeAway = round.home_team === this.selectedTeamObj.text ? 'home' : 'away'
              let tempRound = {
                ...round,
                match_dtm: korDtm.toISOString().replace('T', ' ').substr(5, 11),
                counter_team: `${counterTeam} (${homeAway})`
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
    },
    changeSelectedTeamObj () {
      let tempTeamList = this.teamList
      this.selectedTeamObj = tempTeamList.filter(item => item.value === this.selectedTeam)[0]
    },
    getResultColor (round) {
      let matchScore = round.match_result.split('-')
      if (matchScore.length < 2) {
        return 'NA'
      }
      if (matchScore[0] === matchScore[1]) {
        return 'DRAW'
      }
      if (this.selectedTeamObj.text === round.home_team) {
        if (matchScore[0] > matchScore[1]) {
          return 'WIN'
        } else {
          return 'LOSE'
        }
      } else {
        if (matchScore[0] < matchScore[1]) {
          return 'WIN'
        } else {
          return 'LOSE'
        }
      }
    },
    closeAlertModal () {
      this.$modal.hide('alert-modal')
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
   & > .table-wrapper {
     .WIN {
       background-image: linear-gradient(to right, #ffffff, #f3f6ff, #dfeeff, #c4e9ff, #a3e4ff, #a3e4ff, #a3e4ff, #a3e4ff, #c4e9ff, #dfeeff, #f3f6ff, #ffffff);
     }
     .LOSE {
       background-image: linear-gradient(to right, #ffffff, #f6edfc, #f4daf4, #f8c5e4, #fdafcc, #fdafcc, #fdafcc, #fdafcc, #f8c5e4, #f4daf4, #f6edfc, #ffffff);
     }
     .DRAW {
       background-image: linear-gradient(to right, #ffffff, #f5f5f5, #ececec, #e2e2e2, #d9d9d9, #d9d9d9, #d9d9d9, #d9d9d9, #e2e2e2, #ececec, #f5f5f5, #ffffff);
     }
   }
 }
</style>
