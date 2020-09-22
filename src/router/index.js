import Vue from 'vue'
import VueRouter from 'vue-router'
import Trainings from '../views/Trainings.vue'
import Members from '../views/Members.vue'
import Groups from '../views/Groups.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/trainings'
  },
  {
    path: '/trainings',
    name: 'trainings',
    component: Trainings
  },
  {
    path: '/members',
    name: 'members',
    component: Members
  },
  {
    path: '/groups',
    name: 'groups',
    component: Groups
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
