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
  .oauth-wrapper
    GoogleLogin(:params="gLoginObj.params" :renderParams="gLoginObj.renderParams" :onSuccess="onSuccess" :onFailure="onFailure")
</template>

<script>
import shaUtil from 'js-sha512'
import GoogleLogin from 'vue-google-login'
import commonApi from '../common/commonApi'

export default {
  name: 'Login',
  components: {
    GoogleLogin
  },
  data () {
    return {
      inputId: '',
      inputPw: '',
      isLoading: false,
      loginError: false,
      errMsg: '',
      gLoginObj: {
        params: {
          client_id: '622739436472-13n9cnt43m6km0877cegh25m5affr5e0.apps.googleusercontent.com'
        },
        renderParams: {
          width: 300,
          height: 50,
          longtitle: true
        }
      }
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
    },
    onSuccess (userData) {
      this.$session.start()
      this.$session.set('jaySession', this.makeUserData(userData.getBasicProfile()))
      this.$router.push('main/dashboard')
    },
    onFailure () {
      this.errMsg = 'Google 로그인에 실패하였습니다.'
      this.loginError = true
    },
    makeUserData (googleUserData) {
      return {
        login_id: googleUserData.Au,
        user_nm: googleUserData.JW
      }
    }
  },
  mounted () {
    this.$session.destroy()
  }
}
</script>

<style lang="less">
html {
  margin: 0;
  width: 100%;
  min-height: 100vh;
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
  & > .oauth-wrapper {
    margin: 20px auto auto auto;
    width: 300px;
  }
}
</style>
