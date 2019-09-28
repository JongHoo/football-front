<template lang="pug">
#dashboard
  .title-wrapper
    span.main-title Standings {{ currentSeason }}
    hr
  .content-wrapper
    v-content
      v-layout(row wrap)
        v-flex(v-for="league in leagueList" :key="league.value" xs12 sm6 md4)
          .standing-wrapper.pa-2
            .legue-logo-wrapper
              img(:src="getLeagueLogo(league.value)" height="30px")
            .stading-grid
              table
                thead
                  tr
                    th.text-xs-center(style="width: 50px;") 순위
                    th.text-xs-center(style="width: auto;") 팀
                    th.text-xs-center(style="width: 50px;") 승점
                tbody
                  tr(v-for="item in topStandings[league.value]" :key="item.team")
                    td.text-xs-center {{ item.position }}
                    td.text-xs-center {{ item.team }}
                    td.text-xs-center {{ item.points }}
  modal(name="alert-modal" width="300" height="auto")
    alert-modal(title="Error" content="서버 오류입니다." @close="closeAlertModal")
</template>

<script>
import commonApi from '../common/commonApi'
import commonData from '../common/commonData'
import AlertModal from '../modals/alertModal'

export default {
  name: 'Dashboard',
  components: { AlertModal },
  data () {
    return {
      currentSeason: commonData.currentSeason(),
      leagueList: commonData.leagueList(),
      topStandings: {}
    }
  },
  methods: {
    async getTopStandings () {
      try {
        const topStandingRawData = await commonApi.getTopStandings(this.currentSeason)
        this.topStandings = this._.groupBy(topStandingRawData.data, 'league_id')
        console.log(this.topStandings)
      } catch (err) {
        this.$modal.show('alert-modal')
      }
    },
    closeAlertModal () {
      this.$modal.hide('alert-modal')
    },
    getLeagueLogo (league) {
      let images = require.context('../assets/logos/', false, /\.png$/)
      return images(`./${league}.png`)
    }
  },
  mounted () {
    this.getTopStandings()
  }
}
</script>

<style lang="less">
#dashboard {
  .title-wrapper {
    margin-top: 10px;
    margin-bottom: 10px;
    & > .main-title {
      font-size: 25px;
      font-weight: bold;
      color: cadetblue;
    }
    & > hr {
      border: 0;
      height: 8px;
      background-image: linear-gradient(to right,rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0));
    }
  }
  .content-wrapper {
    .standing-wrapper {
      margin: 10px;
      & > .stading-grid {
        & > table {
          width: 250px;
          min-height: 120px;
          border-spacing: 0px;
          & > thead {
            background-color: aquamarine;
            th {
              border-bottom: solid 1px #379641;
            }
          }
          & > tbody {
            background: white;
          }
        }
      }
    }
  }
}
</style>
