import Vue from 'vue'
import Dashbord from '@/containers/Dashboard'

describe('Dashboard', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Dashbord)
    const vm = new Constructor().$mount()
    // expect(vm.$el.querySelector('.hello h1').textContent)
    //   .toEqual('Welcome to Your Vue.js App')
  })
})
