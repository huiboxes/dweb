import axios from 'axios'
import { servicePath } from '@/config/apiUrl'
import { message } from 'ant-design-vue'

export default async (username: string, password: string) => {
  const correctUser = /^[a-zA-Z0-9_-]{4,16}$/.test(username)
  const emptyPwd = password.length === 0
  
  if (!correctUser || emptyPwd) {
    message.error('账号或者密码格式错误')
    return
  }

  const res = await axios({
    method: 'GET',
    url: servicePath.login,
    params: {
      username,
      password,
    },
  })

  if (res.data.code != 200) {
    message.error('账号或者密码不正确')
    return
  }
  return true
}
