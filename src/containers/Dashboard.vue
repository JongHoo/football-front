<template lang="pug">
#dashboard
  <!--v-carousel(height="100%" hide-delimiters hide-controls)-->
    <!--v-carousel-item(v-for="(slide, i) in slides" :key="i")-->
      <!--v-img.slide-img(:src="getslideImg(slide.img)" height="200")-->
        <!--v-container(fill-height)-->
          <!--v-layout(align-center)-->
            <!--v-flex-->
              <!--span.display-1.slide-title {{ slide.title }}-->
              <!--br-->
              <!--br-->
              <!--span.subheading.slide-text {{ slide.text }}-->
  .title-wrapper
    span.main-title Standings {{ currentSeason }}
    hr
  .content-wrapper
    .stading-grid(v-for="key in Object.keys(topStandings)")
      v-data-table(
        :headers="fields"
        :items="topStandings[key]"
        no-data-text="No Data"
        :paging="false")
        template(slot="items" slot-scope="props")
          td.text-xs-center {{ props.item.position }}
          td {{ props.item.team }}
          td.text-xs-center {{ props.item.points }}
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
      topStandings: {},
      slides: [
        {
          title: '해외 축구 실시간 순위',
          text: '매일 업데이트 되는 각국 리그의 순위를 확인하세요.',
          img: 'field'
        },
        {
          title: '팀별 일정',
          text: '좋아하는 팀들의 일정과 결과를 체크하세요.',
          img: 'oldman'
        }
      ],
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
        }
      ]
    }
  },
  methods: {
    getslideImg (imgName) {
      let images = require.context('../assets/images/', false, /\.jpg$/)
      return images(`./${imgName}.jpg`)
    },
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
    }
  },
  mounted () {
    this.getTopStandings()
  }
}
</script>

<style lang="less">
#dashboard {
  & > .v-carousel {
    border-radius: 15px;
  }
  & .slide-img {
    border-radius: 15px;
    & span {
      margin-left: 10px;
      color: #ffffff;
    }
  }
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
    & > .stading-grid {
      width: 30%;
      float: left;
      margin-left: 10px;
    }
  }
}
</style>
