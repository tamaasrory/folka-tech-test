import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import './assets/custome.css'
import { setHeaderToken } from './utils/auth'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://techtest.folkatech.com/api/'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

if (token) {
  setHeaderToken(token)
}
if (user) {
  store.commit('set_user', JSON.parse(user))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
