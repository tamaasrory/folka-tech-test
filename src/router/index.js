import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/product-list',
    name: 'ProductList',
    component: () => import(/* webpackChunkName: "product-list" */ '../views/ProductList.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/detail-product/:slug',
    name: 'DetailProduct',
    props: true,
    component: () => import(/* webpackChunkName: "detail-product" */ '../views/DetailProduct.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      guest: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters.isLoggedIn && store.getters.user) {
      next()
      return
    }
    next('/login')
  }

  if (to.matched.some(record => record.meta.guest)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  }

  next()
})

export default router
