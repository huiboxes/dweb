import axios from 'axios'

import login from './login'
import * as file from './file'
import * as user from './user'

import { ipUrl } from '@/config/apiUrl'

axios.defaults.baseURL = ipUrl
axios.defaults.withCredentials = true

export default{
  login,
  file,
  user,
}