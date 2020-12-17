import Vue from 'vue'
import App from './App.vue'

// Vuetify
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// https://stackoverflow.com/questions/57053728/vuetify-icon-not-showing
import '@mdi/font/css/materialdesignicons.css'
Vue.use(Vuetify)

// router defined in router.js
import router from './router'

// GAuth
import GAuth from 'vue-google-oauth2'
Vue.use(GAuth, {
  clientId: '943529136358-66uu34u80q0a9t3p4b2sbb96dqba9h7k.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
  fetch_basic_profile: false
})

// other
Vue.config.productionTip = false

// backend
Vue.prototype.$pouchDb = 'http://0.0.0.0:5984/'
Vue.prototype.$backend = 'http://0.0.0.0:23450/'

new Vue({
  vuetify: new Vuetify({
    theme: { light: true },
    icons: {
      iconfont: 'mdi',
    },
  }),
  router: router,
  render: h => h(App),
}).$mount('#app')
