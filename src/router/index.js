import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/product-list',
    name: 'ProductList',
    component: () => import(/* webpackChunkName: "product-list" */ '../views/ProductList.vue')
  },
  {
    path: '/detail-product/:slug',
    name: 'DetailProduct',
    props: true,
    component: () => import(/* webpackChunkName: "detail-product" */ '../views/DetailProduct.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
