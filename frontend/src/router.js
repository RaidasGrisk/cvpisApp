import Vue from 'vue'
import VueRouter from 'vue-router'

// router components
import Home from './pages/Home'
import Search from './pages/Search'
import Subscriptions from './pages/Subscriptions'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      icon: 'mdi-home-minus-outline',
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
      icon: 'mdi-file-search-outline'
    },
    {
      path: '/Subscriptions',
      name: 'My subscriptions',
      component: Subscriptions,
      icon: 'mdi-file-search-outline'
    }
  ],
  linkActiveClass: 'is-active'
})
