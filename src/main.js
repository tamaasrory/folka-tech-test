import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import './assets/custome.css'
import { setHeaderToken } from './utils/auth'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://techtest.folkatech.com/api/'

Vue.config.productionTip = false

const token = localStorage.getItem('token')

if (token) {
  setHeaderToken(token)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
