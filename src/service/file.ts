import axios from 'axios'
import { servicePath } from '@/config/apiUrl'

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
    url: servicePath.deleteBucket,
    params: {
      bucket,
    },
  })
}

export const deleteDir = (bucket: string, key: string) => {
  return axios({
    method: 'POST',
    url: servicePath.deleteDir,
    params: {
      bucket,
      key,
    },
  })
}

export const deleteFile = (bucket: string, key: string) => {
  return axios({
    method: 'POST',
    url: servicePath.deleteFile,
    params: {
      bucket,
      key,
    },
  })
}

export const upload = (
  bucket: string,
  key: string,
  mediaType: string,
  formData
) => {
  return axios({
    method: 'POST',
    url: servicePath.upload,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    params: {
      bucket,
      key,
      mediaType,
    },
    data: formData,
  })
}
