import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { ipUrl } from '@/config/apiUrl'

axios.defaults.baseURL = ipUrl
axios.defaults.withCredentials = true
const app = createApp(App)

app.config.globalProperties.http = axios

app.use(router).mount('#app')
