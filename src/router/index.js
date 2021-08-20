import Vue from 'vue'
import VueRouter from 'vue-router'
import Vi from '../views/vi.vue';
import Vay from '../views/vay.vue';

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    component: Vi,
  },
  {
    path:"/vay",
    component: Vay,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
