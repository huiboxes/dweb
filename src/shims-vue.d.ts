declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

// declare module '@vue/runtime-core' {
//   import { AxiosInstance } from 'axios'
//   interface ComponentCustomProperties {
//     $http: AxiosInstance
//   }
// }
