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

// other
Vue.config.productionTip = false

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
