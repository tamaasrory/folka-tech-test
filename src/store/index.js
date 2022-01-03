import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    product: {}
  },
  getters: {
    get_product (state) {
      return state.product
    }
  },
  mutations: {
    set_product (state, data) {
      state.product = data
    }
  },
  actions: {
    load_data ({ dispatch, commit }, data) {
      const query = new URLSearchParams(data).toString()
      return new Promise((resolve, reject) => {
        axios.get(`https://api.lakkon.id/api/v1/products?${query}`)
          .then(response => {
            resolve(response)
          }).catch(err => {
            reject(err)
          })
      })
    }
  },
  modules: {
    auth
  }
})
