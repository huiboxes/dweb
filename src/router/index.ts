import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../views/Home/Home.vue'
import Index from '../views/Home/Index.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue';
import Myfile from '../views/Dashboard/Myfile/index.vue';

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
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        redirect: '/dashboard/myfile',
        children:[
          {
            path: 'myfile',
            name: 'myfile',
            component: Myfile,
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
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


// router.beforeEach((to,from,next)=>{
//   if (window.isLogin) {
//     if (to.path === '/login') {
//       next('/')
//     }else{
//       next()
//     }
//   }else{
//     if (to.path === '/login') {
//       next()
//     }else{
//       next('/login?redirect=' + to.fullPath)
//     }
    
//   }
// })

export default router
