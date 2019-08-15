<template lang="pug">
#login
  .login-wrapper
    .center
      span.title Login
    .form
      v-text-field(v-model="inputId" label="ID" :dark="true" :loading="isLoading")
      v-text-field(v-model="inputPw" label="Password" :dark="true" type="password" :loading="isLoading")
    .warning-text(v-if="loginError")
      span ID 및 비밀번호가 틀렸습니다.
    .center
      v-btn(@click="doLogin" :disabled="isLoading") LOGIN
</template>

<script>
import commonApi from '../common/commonApi'

export default {
  name: 'Login',
  data () {
    return {
      inputId: '',
      inputPw: '',
      isLoading: false,
      loginError: false
    }
  },
  methods: {
    doLogin () {
      this.isLoading = true
      commonApi.login(this.inputId, this.inputPw)
        .then(res => {
          this.isLoading = false
          this.$session.start()
          this.$session.set('jaySession', JSON.stringify(res.data))
          this.$router.push('main/dashboard')
        })
        .catch(err => {
          this.isLoading = false
          this.loginError = true
          console.log(err)
        })
    }
  },
  mounted () {
    this.$session.destroy()
  }
}
</script>

<style lang="less">
html {
  background: url('../assets/images/champions.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#login {
  & > .login-wrapper {
    margin: 100px auto auto auto;
    width: 300px;
    background-color: black;
    opacity: 0.7;
    border-radius: 20px;
    color: #fff;
    padding: 15px;
    & > .center {
      text-align: center;
      & > .title {
        font-weight: bold;
      }
    }
    & > .warning-text {
      font-size: 11px;
    }
  }
}
</style>
