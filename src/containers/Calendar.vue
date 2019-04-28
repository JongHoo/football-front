<template lang="pug">
#calendar
  .search-condition
    b-form-select.select(v-model="selectedSeason" :options="seasonList")
    b-form-select.select(v-model="selectedLeague" :options="leagueList" @change="changeLeague")
    b-form-select.select(v-model="selectedTeam" :options="teamList")
    b-button(variant="info" @click="onSearch") 조회
  .table-wrapper
    b-table(
    striped
    small
    bordered
    :items="matchList"
    :fields="fields"
    :busy="isLoading"
    )
      div(slot="table-busy" class="text-center text-info my-2")
        b-spinner.align-middle
          strong Loading...
</template>

<script>
export default {
  name: 'Calendar',
  data () {
    return {
      isLoading: false,
      matchList: [],
      selectedSeason: '18-19',
      selectedLeague: 'premier-league',
      selectedTeam: 'blfamr89lxeyywtsraiqzq5p5zuz57i6', // chelsea
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
          text: 'Eredivisie',
          value: 'eredivisie'
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
      ],
      fields: [
        {
          key: 'name',
          label: '라운드',
          class: 'text-center'
        },
        {
          key: 'match_dtm',
          label: '일시',
          class: 'text-center'
        },
        {
          key: 'home_team',
          label: '홈팀',
          class: 'text-center'
        },
        {
          key: 'match_result',
          label: '스코어',
          class: 'text-center'
        },
        {
          key: 'away_team',
          label: '원정팀',
          class: 'text-center'
        }
      ]
    }
  },
  methods: {
    changeLeague () {
      this.teamList = []
      let url = `http://soccer.sportsopendata.net/v1/leagues/${this.selectedLeague}/seasons/${this.selectedSeason}/teams`
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
        alert('팀을 선택하세요')
        return
      }
      this.matchList = []
      let url = `http://soccer.sportsopendata.net/v1/leagues/${this.selectedLeague}/seasons/${this.selectedSeason}/rounds?team_identifier=${this.selectedTeam}`
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
                match_dtm: korDtm.toISOString().replace('T', ' ').substr(0, 16)
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
