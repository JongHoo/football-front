import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/containers/Dashboard'
import Standings from '@/containers/Standings'
import Calendar from '@/containers/Calendar'
import Admin from '@/containers/Admin'
import Login from '@/containers/Login'

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
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
