declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare interface Window {
  isLogin: boolean
}

// declare module '@vue/runtime-core' {
//   import { AxiosInstance } from 'axios'
//   interface ComponentCustomProperties {
//     $http: AxiosInstance
//   }
// }
