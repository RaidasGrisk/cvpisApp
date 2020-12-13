import Vue from 'vue'
import VueRouter from 'vue-router'

// router components
import Home from './pages/Home'
import Search from './pages/Search'

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
      path: '/Search tenders',
      name: 'Search',
      component: Search,
      icon: 'mdi-file-search-outline'
    }
  ],
  linkActiveClass: 'is-active'
})
