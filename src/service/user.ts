import axios from 'axios'
import { servicePath } from '@/config/apiUrl'

export const getUserList = () => {
  return axios({
    method: 'GET',
    url: servicePath.userlist,
  })
}

export const useradd = (username, password, role = 'USER', desc = '') => {
  return axios({
    method: 'POST',
    url: servicePath.user,
    params: {
      username,
      password,
      role,
      detail: desc,
    },
  })
}
