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
      icon: 'mdi-checkbox-blank-circle',
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
      icon: 'mdi-file-search-outline'
    },
    {
      path: '/Subscriptions',
      name: 'My profile',
      component: Subscriptions,
      icon: 'mdi-account'
    }
  ],
  linkActiveClass: 'is-active'
})
