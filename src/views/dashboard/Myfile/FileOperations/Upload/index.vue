<template>
  <a-upload
    name="file"
    :multiple="true"
    :headers="headers"
    action="#"
    @change="handleChange"
  >
    <!-- https://www.mocky.io/v2/5cc8019d300000980a055e76 
        192.168.220.120:8081/dx/object
    -->
    <a-button>上传文件</a-button>
  </a-upload>
</template>

<script>
import { Upload, Button, message } from 'ant-design-vue'
// import { ref } from 'vue'
// import Store from '@/store'
// import getUrl from './getUrl'

export default {
  components: {
    'a-upload': Upload,
    'a-button': Button,
  },
  setup() {
    // const URL = ref('')
    // const filePath = inject(Store.filePath)
    const headers = {}

    const handleChange = info => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`)
      }
    }

    return {
      handleChange,
      headers,
    }
  },
}
</script>

<style lang="scss" scoped>
// .ant-btn {
//   height: 40px;
//   padding: 0 11px;
//   border-radius: 4px;
//   background-color: #fafafa;
//   &:hover {
//     border: 1px solid #47c479;
//     color: #47c479;
//   }
// }
</style>
