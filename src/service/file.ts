import axios from 'axios'
import { servicePath } from '@/config/apiUrl'
import service from '.'

export const init = () => axios(servicePath.getBucketList)

export const changeDir = (bucket: string, dir: string) => {
  return axios({
    method: 'GET',
    url: servicePath.getFilesList,
    params: {
      bucket,
      dir,
    },
  })
}

export const newDir = (bucket: string, key: string) => {
  return axios({
    method: 'POST',
    url: servicePath.newDir,
    params: {
      bucket,
      key,
    },
  })
}

export const newBucket = (bucket: string) => {
  return axios({
    method: 'POST',
    url: servicePath.newBucket,
    params: {
      bucket,
    },
  })
}

export const deleteBucket = (bucket: string) => {
  return axios({
    method: 'POST',
    url: servicePath.delteBucket,
    params: {
      bucket,
    },
  })
}


