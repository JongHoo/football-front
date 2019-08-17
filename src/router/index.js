import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/containers/Dashboard'
import Standings from '@/containers/Standings'
import Calendar from '@/containers/Calendar'
import Admin from '@/containers/Admin'
import Login from '@/containers/Login'
import Main from '@/containers/Main'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'standings',
          name: 'Standings',
          component: Standings
        },
        {
          path: 'calendar',
          name: 'Calendar',
          component: Calendar
        },
        {
          path: 'admin',
          name: 'Admin',
          component: Admin
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !checkAuth()) {
    next('/login')
  } else {
    next()
  }
})

const checkAuth = () => {
  return Vue.prototype.$session.exists()
}

export default router
