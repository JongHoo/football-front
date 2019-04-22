import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/containers/Dashboard'
import Standings from '@/containers/Standings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/standings',
      name: 'Standings',
      component: Standings
    }
  ]
})
