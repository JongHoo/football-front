<template lang="pug">
#admin
  .card-wrapper
    v-card.mx-auto(width="300")
      v-card-title.headline 팀 목록 업데이트
      v-card-text 리그, 시즌별 팀 목록을 업데이트 합니다.
      v-card-actions
        v-btn(@click="openUpdateDialog('TEAM')") Update
    v-card.mx-auto(width="300")
      v-card-title.headline 팀 순위 업데이트
      v-card-text 리그, 시즌별 팀 순위를 업데이트 합니다.
      v-card-actions
        v-btn(@click="openUpdateDialog('STANDING')") Update
    v-card.mx-auto(width="300")
      v-card-title.headline 경기 일정 업데이트
      v-card-text 리그, 시즌별 경기 일정을 업데이트 합니다.
      v-card-actions
        v-btn(@click="openUpdateDialog('MATCH')") Update
  .text-xs-center
    v-dialog(v-model="isDialog" width="400")
      v-card
        v-card-title(class="headline" primary-title) Select Options
        v-card-text 리그 및 시즌을 입력하세요.
        v-select(:items="leagueList" v-model="selectedLeague")
        v-select(:items="seasonList" v-model="selectedSeason")
        v-card-actions
          v-spacer
          v-btn(color="red" flat="flat" @click="isDialog=false" v-bind:disabled="isLoading") CANCEL
          v-btn(color="green" flat="flat" @click="onSave()" v-bind:disabled="isLoading") OK
</template>

<script>
import commonApi from '../common/commonApi'

export default {
  name: 'Admin',
  data () {
    return {
      saveCtgry: '',
      isDialog: false,
      isLoading: false,
      selectedSeason: '18-19',
      selectedLeague: '',
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
      ]
    }
  },
  methods: {
    openUpdateDialog (ctgry) {
      this.saveCtgry = ctgry
      this.isDialog = true
    },
    getLeagueList () {
      commonApi.getLeagues()
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
        })
    },
    onSave () {
      if (this.saveCtgry === 'TEAM') {
        this.requestUpdateTeams()
      } else if (this.saveCtgry === 'STANDING') {
        this.requestUpdateStandings()
      } else if (this.saveCtgry === 'MATCH') {
        this.requestUpdateMatches()
      }
    },
    requestUpdateTeams () {
      this.isLoading = true
      commonApi.updateTeams(this.selectedLeague, this.selectedSeason)
        .then((res) => {
          this.isLoading = false
          this.isDialog = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    requestUpdateStandings () {
      this.isLoading = true
      commonApi.updateStandings(this.selectedLeague, this.selectedSeason)
        .then((res) => {
          this.isLoading = false
          this.isDialog = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    },
    requestUpdateMatches () {
      this.isLoading = true
      commonApi.updateMatches(this.selectedLeague, this.selectedSeason)
        .then((res) => {
          this.isLoading = false
          this.isDialog = false
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    }
  },
  created () {
    this.getLeagueList()
  }
}
</script>

<style lang="less" scoped>
#admin {
  & > .card-wrapper {
    display: flex;
  }
}
</style>
