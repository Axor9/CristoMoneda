import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TxView from '../views/TxView.vue'
import BlockView from '../views/BlockView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tx/:hash',
    name: 'tx',
    component: TxView
  },
  {
    path: '/block/:block',
    name: 'block',
    component: BlockView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
