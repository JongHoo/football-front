<template lang="pug">
#main
  v-app
    v-toolbar.main-toolbar
      v-toolbar-title(class="white--text")
        span(@click="() => movePage('dashboard')" :style="{ cursor: 'pointer'}") 해축해축
      v-toolbar-items
        v-btn(flat class="white--text" @click="() => movePage('standings')")
          span 순위
        v-btn(flat class="white--text" @click="() => movePage('calendar')")
          span 일정
      v-spacer
      v-toolbar-items
        span.user-info.hidden-sm-and-down {{ session.user_nm }}
        v-btn(flat class="white--text" @click="() => logout()")
          span Log out
    .router-wrapper
      router-view
    v-footer
      v-card.flex(flat tile)
        v-card-actions.grey.darken-3.justify-center &copy;2019 - JongHoo Hwang
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
    }
  },
  computed: {
    session () {
      return this.$session.get('jaySession')
    }
  },
  methods: {
    movePage (url) {
      this.$router.push(url).catch(() => {})
    },
    logout () {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="less">
#main {
  .v-toolbar {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .main-toolbar {
    background: #fc00aa;
    background: linear-gradient(315deg,#fc00aa,#00dbde);
  }
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
  .user-info {
    display: flex;
    align-items: center;
    color: white;
    margin-right: 20px;
  }
}
</style>
