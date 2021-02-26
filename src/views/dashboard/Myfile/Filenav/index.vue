<template>
  <a-breadcrumb class="filenav-wrapper">
    <a-breadcrumb-item
      v-for="(f, index) in path"
      :key="'f' + index"
      @click="switchPath(f, index)"
    >
      {{ f }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { Breadcrumb } from 'ant-design-vue'
import { inject, ref, watch } from 'vue'
import Store from '@/store'
import Utils from '@/util'
import service from '@/service'

export default {
  components: {
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
  },
  setup() {
    const filePath = inject(Store.filePath)
    const path = ref([])
    const bucketInfo = inject(Store.bucketInfo)

    watch(filePath, () => {
      path.value = Utils.parsePath(filePath.value)
    })

    const switchPath = async (f, key) => {
      if (key === 0) {
        // 是否是bucket
        const res = await service.file.changeDir(f, '/')
        bucketInfo.value = res.data.objectList
        filePath.value = `/${f}/`
      } else {
        const pathArr = filePath.value.split('/')
        const bucketName = pathArr[1]
        pathArr.splice(key + 2)
        const finalPath = pathArr.join('/') + '/'
        const res = await service.file.changeDir(bucketName, finalPath)
        bucketInfo.value = res.data.objectList
        filePath.value = finalPath
      }
    }

    return {
      path,
      switchPath,
    }
  },
}
</script>

<style lang="scss" scoped>
.filenav-wrapper {
  height: 35px;
  line-height: 30px;
  font-size: 15px;
  &::v-deep span {
    margin: 2px;
  }
  &::v-deep span.ant-breadcrumb-link {
    margin-left: -4px;
  }
}
</style>
