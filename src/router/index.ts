import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home/Home.vue'
import Index from '../views/Home/Index.vue'

const routes: Array<RouteRecordRaw> = [
  /* 前端界面 */
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
      /* 登陆后界面 */
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard/Dashboard.vue'),
        redirect: '/dashboard/myfile',
        children:[
          {
            path: 'myfile',
            name: 'myfile',
            component: ()=>import('../views/Dashboard/Myfile/index.vue'),
          },
          {
            path: 'private',
            name: 'private',
            component: ()=>import('../views/Dashboard/Private/index.vue'),
          },
          {
            path: 'recently',
            name: 'recently',
            component: ()=>import('../views/Dashboard/Recently/index.vue'),
          },
          {
            path: 'recycle',
            name: 'recycle',
            component: ()=>import('../views/Dashboard/Recycle/index.vue'),
          },
        ]
      },
    ],
  },
  /* 注册登录界面 */
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
