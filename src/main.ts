import { createApp } from 'vue'
import { Button, List, Dropdown, Upload } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import 'ant-design-vue/dist/antd.css'

import App from './App.vue'
import { router } from './router'

const app = createApp(App)
app.use(router)
app.use(Button)
app.use(List)
app.use(Dropdown)
app.use(Upload)
app.use(UploadOutlined)

app.mount('#app')
