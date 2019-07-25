<template lang="pug">
#app
  v-app
    v-toolbar(color="primary")
      v-toolbar-title(class="white--text")
        span(@click="() => movePage('/')" :style="{ cursor: 'pointer'}") 해축해축
      v-toolbar-items
        v-btn(flat class="white--text" @click="() => movePage('standings')")
          span 순위
        v-btn(flat class="white--text" @click="() => movePage('calendar')")
          span 일정
        v-btn(flat class="white--text" @click="() => movePage('admin')")
          span ADM
    .router-wrapper
      router-view
    v-footer
      v-card.flex(flat tile)
        v-card-actions.grey.darken-3.justify-center &copy;2019 - JongHoo Hwang
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      userNm: 'User'
    }
  },
  methods: {
    movePage (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less">
  #app {
    .v-toolbar__title {
      margin-right: 30px;
    }

    .router-wrapper {
      width: 100%;
      max-width: 1024px;
      min-height: calc(100vh - 101px);
      padding: 10px;
      align-self: center;
    }
    .v-card__actions {
      color: #ffffff;
    }
  }
</style>
