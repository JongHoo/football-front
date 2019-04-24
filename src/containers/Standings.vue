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
</template>

<script>
export default {
  name: 'Standings',
  data () {
    return {
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
    changeCondition () {
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
            console.log(res.data.data.standings)
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
