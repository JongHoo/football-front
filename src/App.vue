<template lang="pug">
#app
  b-navbar(
  toggleable="lg"
  type="dark"
  variant="info"
  )
    b-navbar-brand(target="/") FootBall
    b-navbar-toggle(target="nav-collapse")
    b-collapse(id="nav-collapse" is-nav)
      b-navbar-nav
        b-nav-item Standings
        b-nav-item Calendar
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
  }
}
</script>

<style>
#app {

}
</style>
