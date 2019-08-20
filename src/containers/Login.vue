<template lang="pug">
#login
  .login-wrapper
    .center
      span.title Login
    .form
      v-text-field(v-model="inputId" label="ID" :dark="true" :loading="isLoading")
      v-text-field(v-model="inputPw" label="Password" :dark="true" type="password" :loading="isLoading" @keyup.enter="doLogin")
    .warning-text(v-if="loginError")
      span {{ errMsg }}
    .center
      v-btn(@click="doLogin" :disabled="isLoading") LOGIN
</template>

<script>
import commonApi from '../common/commonApi'
import shaUtil from 'js-sha512'

export default {
  name: 'Login',
  data () {
    return {
      inputId: '',
      inputPw: '',
      isLoading: false,
      loginError: false,
      errMsg: ''
    }
  },
  methods: {
    doLogin () {
      if (!this.checkIdValid(this.inputId)) {
        this.errMsg = 'ID에는 특수문자 및 공백을 사용할 수 없습니다.'
        this.loginError = true
        return
      }
      this.isLoading = true
      commonApi.login(this.inputId, shaUtil.sha512(this.inputPw))
        .then(res => {
          this.isLoading = false
          this.$session.start()
          this.$session.set('jaySession', res.data)
          this.$router.push('main/dashboard')
        })
        .catch(err => {
          this.isLoading = false
          this.errMsg = 'ID혹은 비밀번호가 틀렸습니다.'
          this.loginError = true
          console.log(err)
        })
    },
    checkIdValid (input) {
      const spacialChar = /[`~!@#$%^&*|\\'";:/?]/gi
      if (input.search(/\s/) !== -1) {
        return false
      } else if (spacialChar.test(input)) {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    this.$session.destroy()
  }
}
</script>

<style lang="less">
/*html {*/
  /*background: url('../assets/images/champions.jpg') no-repeat center center fixed;*/
  /*-webkit-background-size: cover;*/
  /*-moz-background-size: cover;*/
  /*-o-background-size: cover;*/
  /*background-size: cover;*/
/*}*/
body {
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background: #fc00aa;
  background: linear-gradient(315deg,#fc00aa,#00dbde);
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
