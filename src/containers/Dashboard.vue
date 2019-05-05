<template lang="pug">
#dashboard
  v-carousel(height="100%" hide-delimiters hide-controls)
    v-carousel-item(v-for="(slide, i) in slides" :key="i")
      v-img.slide-img(:src="getslideImg(slide.img)" height="200")
        v-container(fill-height)
          v-layout(align-center)
            v-flex
              span.display-1.slide-title {{ slide.title }}
              br
              br
              span.subheading.slide-text {{ slide.text }}
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
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
      ]
    }
  },
  methods: {
    getslideImg (imgName) {
      let images = require.context('../assets/images/', false, /\.jpg$/)
      return images(`./${imgName}.jpg`)
    }
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
  }
</style>
