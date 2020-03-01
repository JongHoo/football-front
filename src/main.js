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

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
