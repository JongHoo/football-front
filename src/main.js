import Vue from 'vue'
import Vuetify from 'vuetify'
import VModal from 'vue-js-modal'
import VueSession from 'vue-session'
import App from './App'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'mdi'
})
Vue.use(VueSession)
Vue.use(VModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
