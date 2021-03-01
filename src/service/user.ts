import axios from 'axios'
import { servicePath } from '@/config/apiUrl'

export const getUserList = () => {
  return axios({
    method: 'GET',
    url: servicePath.userlist
  })
}