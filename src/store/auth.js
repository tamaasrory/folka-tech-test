import axios from 'axios'
import { removeHeaderToken, setHeaderToken } from '../utils/auth'

export default {
  state: {
    user: null,
    isLoggedIn: false
  },
  mutations: {
    set_user (state, data) {
      state.user = data
      state.isLoggedIn = true
    },
    reset_user (state) {
      state.user = null
      state.isLoggedIn = false
    }
  },
  getters: {
    isLoggedIn (state) {
      return state.isLoggedIn
    },
    user (state) {
      return state.user
    }
  },
  actions: {
    login ({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('login', data)
          .then(response => {
            console.log(response)
            const token = response.data.data.token
            localStorage.setItem('token', token)
            setHeaderToken(token)
            commit('set_user', response.data.data)
            resolve(response)
          })
          .catch(err => {
            commit('reset_user')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register ({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios.post('register', data)
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            commit('reset_user')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit('reset_user')
        localStorage.removeItem('token')
        removeHeaderToken()
        resolve()
      })
    }
  }
}
