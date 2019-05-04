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
    router-view
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
  }
</style>
