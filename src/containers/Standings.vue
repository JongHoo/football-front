<template lang="pug">
#standings
  br
  b-container
    b-row(align-h="start")
      b-col(md="3")
        b-row
          b-col.vertical-center(md="4")
            span League :
          b-col.vertical-center(md="6")
            b-form-select(v-model="selected" :options="leagueList" @change="changeLeague()")
</template>

<script>
export default {
  name: 'Standings',
  data () {
    return {
      selected: 'EPL',
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
      ]
    }
  },
  methods: {
    changeLeague () {
      let url = 'http://soccer.sportsopendata.net/v1/leagues/premier-league/seasons/16-17/standings'
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
