<template>
  <a-upload
    name="file"
    :multiple="true"
    :showUploadList="false"
    :customRequest="customRequest"
  >
    <a-button>上传文件</a-button>
  </a-upload>
</template>
<script>
import { inject } from 'vue'
import { Upload, Button, message } from 'ant-design-vue'
import service from '@/service'
import Store from '@/store'
import Utils from '@/util'

export default {
  components: {
    'a-upload': Upload,
    'a-button': Button,
  },
  setup() {
    const filePath = inject(Store.filePath)
    const bucketName = Utils.getBucketName(filePath.value)

    const bucketInfo = inject(Store.bucketInfo)

    const saveFile = (formData, filename, mediaType) => {
      service.file
        .upload(bucketName, filename, mediaType, formData)
        .then(() => message.success(`文件上传成功`))
    }

    const customRequest = async data => {
      const key = filePath.value.split(bucketName)[1] + data.file.name
      bucketInfo.value = [...bucketInfo.value, { key, name: data.file.name,length: data.file.size }]
      const formData = new FormData()
      formData.append('content', data.file)
      await saveFile(formData, key, data.file.type)
    }

    return {
      customRequest,
    }
  },
}
</script>
