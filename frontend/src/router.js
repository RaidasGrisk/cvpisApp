import Vue from 'vue'
import VueRouter from 'vue-router'

// router components
import Home from './pages/Home'
import Docs from './pages/Docs'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      icon: 'mdi-view-dashboard',
    },
    {
      path: '/Docs',
      name: 'Docs',
      component: Docs,
      icon: 'mdi-image'
    }
  ],
  linkActiveClass: 'is-active'
})
