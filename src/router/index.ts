import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home/Home.vue'
import Index from '../views/Home/Index.vue'
import Help from '../views/Home/Help.vue'
import Joinus from '../views/Home/Joinus.vue'
import Login from '../views/Home/Login.vue'
import Register from '../views/Home/Register.vue'

import Dashboard from '../views/dashboard/Dashboard.vue'


const history = createWebHistory()
export const router = createRouter({
  history: history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: 'index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index
        },
        {
          path: '/help',
          name: 'help',
          component: Help
        },
        {
          path: '/joinus',
          name: 'joinus',
          component: Joinus
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
  ],
})
