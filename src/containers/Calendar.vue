<template lang="pug">
#calendar
  .search-condition
    v-select.select(:items="seasonList" v-model="selectedSeason" @change="changeLeague")
    v-select.select(:items="leagueList" v-model="selectedLeague" @change="changeLeague")
    v-select.select(:items="teamList" v-model="selectedTeam")
    v-btn(color="info" @click="onSearch") 조회
  .table-wrapper
    v-data-table(
    :headers="fields"
    :items="matchList"
    no-data-text="No Data"
    hide-actions
    :loading="isLoading")
      template(slot="items" slot-scope="props")
        td {{ props.item.name }}
        td {{ props.item.match_dtm }}
        td {{ props.item.home_team }}
        td {{ props.item.match_result }}
        td {{ props.item.away_team }}
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
          value: 'name',
          text: '라운드',
          sortable: false
        },
        {
          value: 'match_dtm',
          text: '일시'
        },
        {
          value: 'home_team',
          text: '홈팀',
          sortable: false
        },
        {
          value: 'match_result',
          text: '스코어',
          sortable: false
        },
        {
          value: 'away_team',
          text: '원정팀',
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
        alert('팀을 선택하세요')
        return
      }
      this.matchList = []
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
     margin: 20px;
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
     margin: 0 20px 50px 20px;
   }
 }
</style>
