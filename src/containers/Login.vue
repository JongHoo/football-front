<template lang="pug">
#login
  v-form
    v-text-field(v-model="inputId" label="ID")
    v-text-field(v-model="inputPw" label="Password")
    v-btn(@click="doLogin") LOGIN
</template>

<script>
import commonApi from '../common/commonApi'
export default {
  name: 'Login',
  data () {
    return {
      inputId: '',
      inputPw: ''
    }
  },
  methods: {
    doLogin () {
      commonApi.login(this.inputId, this.inputPw)
        .then(res => {
          console.log(res)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
