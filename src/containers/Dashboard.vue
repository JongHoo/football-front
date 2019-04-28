<template lang="pug">
#dashboard
  b-carousel(
    controls
    indicators
    backgroud="#ababab"
    slide
    style="text-shadow: 1px 1px 2px #333;"
  )
    b-carousel-slide.slide1(
      img-blank
      caption="해외 축구 실시간 순위"
      text="매일 업데이트 되는 각국 리그의 순위를 확인하세요."
    )
    b-carousel-slide.slide2(
      img-blank
      caption="팀별 일정"
      text="여러분들이 좋아하는 팀들의 일정과 결과를 체크하세요."
    )

</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="less">
  .carousel {
    margin: 20px;
    img {
      height: 200px !important;
    }
    & > .carousel-inner {
      border-radius: 10px;
    }
    .slide1 {
      background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
    }
    .slide2 {
      background-image: linear-gradient(to right top, #ff00bd, #ff318c, #ff6666, #ff944f, #ffba50);
    }
  }
</style>
