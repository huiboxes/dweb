<template>
  <a-button @click="showModal">
    新建文件夹
  </a-button>
  <a-modal
    title="新建文件夹"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
  >
    <a-input
      v-model:value="dirName"
      placeholder="请输入文件夹名字，可递归创建文件夹"
    />
    <span class="tip">递归创建如：" /dir1/dir2/dir3/dir4/... "</span>
  </a-modal>
</template>

<script>
import Store from '@/store'
import { Modal, Button, Input, message } from 'ant-design-vue'
import { inject, ref } from 'vue'
import service from '@/service'
import Utils from '@/util'

export default {
  components: {
    'a-modal': Modal,
    'a-button': Button,
    'a-input': Input,
  },
  setup() {
    const visible = ref(false)
    const confirmLoading = ref(false)
    const dirName = ref('')
    const filePath = inject(Store.filePath)
    const bucketInfo = inject(Store.bucketInfo)

    const showModal = () => {
      visible.value = true
    }

    const show = () => {
      visible.value = false
      confirmLoading.value = false
    }

    const newfileBar = barName => {
      const fileBar = document.querySelector('div.fileBar')
      const newfileBar = fileBar.cloneNode(true)
      newfileBar.querySelector('h2.title').innerText = barName
      document.querySelector('div.booth').appendChild(newfileBar)
    }

    const handleOk = async () => {
      confirmLoading.value = true
      dirName.value = dirName.value.trim()

      if (!(dirName.value.indexOf(' ') == -1)) {
        message.warning('不能有空格')
        show()
        return
      }

      if (filePath.value === '/') {
        const { status } = await service.file.newBucket(dirName.value)
        Utils.tips(status, '创建文件夹')
        dirName.value = dirName.value.split('/')[0]
          ? dirName.value.split('/')[0]
          : dirName.value.split('/')[1]
        bucketInfo.value = [...bucketInfo.value, { bucketName: dirName.value }]
        show()
      } else {
        const bucketName = Utils.getBucketName(filePath.value)
        let key = ''

        if (Utils.getCharCount(filePath.value, '/') === 2) {
          if (!dirName.value.startsWith('/')) key = '/' + dirName.value + '/'
          const { status } = await service.file.newDir(bucketName, key)
          Utils.tips(status, '创建文件夹')
        } else {
          key = filePath.value.split('/').splice(2)
          key.pop()
          key = '/' + key.join('/') + '/' + dirName.value + '/'
          const { status } = await service.file.newDir(bucketName, key)
          Utils.tips(status, '创建文件夹')
        }
        dirName.value = dirName.value.split('/')[0]
          ? dirName.value.split('/')[0]
          : dirName.value.split('/')[1]
        bucketInfo.value = [...bucketInfo.value, { key, name: dirName.value }]
        show()
      }
    }

    return {
      visible,
      confirmLoading,
      dirName,
      showModal,
      handleOk,
    }
  },
}
</script>

<style lang="scss" scoped>
span.tip {
  padding: 0 1rem;
  color: #888;
  font-size: 12px;
}
</style>
