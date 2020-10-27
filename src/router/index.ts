import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home/Home.vue'
import Index from '../views/Home/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index,
      },
      {
        path: '/help',
        name: 'help',
        component: () => import('../views/Home/Help.vue'),
      },
      {
        path: '/joinus',
        name: 'joinus',
        component: () => import('../views/Home/Joinus.vue'),
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/dashboard/Dashboard.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Home/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Home/Register.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
