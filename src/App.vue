<template lang="pug">
#app
  b-navbar(
    toggleable="lg"
    type="dark"
    variant="info"
  )
    b-navbar-brand
      span(@click="() => movePage('/')" :style="{ cursor: 'pointer'}") 해축해축
    b-navbar-toggle(target="nav-collapse")
    b-collapse(id="nav-collapse" is-nav)
      b-navbar-nav
        b-nav-item
          span(@click="() => movePage('standings')") 순위
        <!--b-nav-item Calendar-->
      b-navbar-nav.ml-auto
        b-nav-item-dropdown(:text="userNm" right)
          b-dropdown-item Profile
          b-dropdown-item Log out
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
  }
</style>
