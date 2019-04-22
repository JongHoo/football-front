<template lang="pug">
#dashboard
  #slides
    b-carousel(
    controls
    indicators
    backgroud="#ababab"
    slide
    style="text-shadow: 1px 1px 2px #333;"
    )
      b-carousel-slide.slide1(
      img-blank
      caption="Fooball League Standings"
      text="Check your favorite team's standings."
      )
      b-carousel-slide.slide2(
      img-blank
      caption="Fooball League Calendar"
      text="Check your favorite team's calendar."
      )

</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="less">
.carousel {
  img {
    height: 300px !important;
  }
  .slide1 {
    background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
  }
  .slide2 {
    background-image: linear-gradient(to right top, #ff00bd, #ff318c, #ff6666, #ff944f, #ffba50);
  }
}
</style>
