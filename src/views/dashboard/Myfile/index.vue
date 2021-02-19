<template>
  <div class="booth">
    <Filenav />
    <!-- @contextmenu.prevent="openMenu($event)" -->
    <Bucket :bucketInfo="bucketInfo" @bucketEmit="getDir" />
    <Tip v-if="!bucketInfo" />
    <BucketMenu :style="location" v-if="menuVisible" />
    <FileOperations class="booth-footer" />
  </div>
</template>

<script>
import { inject, reactive, ref } from 'vue'
import Store from '@/store'

import Bucket from './Bucket/index.vue'
import BucketMenu from './Menu/index.vue'
import FileOperations from './FileOperations/index.vue'
import Filenav from './Filenav/index.vue'
import Tip from './Tip/index.vue'
import Utils from '@/util'
import service from '@/service'

export default {
  components: {
    Bucket,
    BucketMenu,
    FileOperations,
    Filenav,
    Tip,
  },
  setup() {
    const menuVisible = ref(false)
    const location = reactive({
      position: 'absolute',
      top: '0',
      left: '0',
    })

    const filePath = inject(Store.filePath)
    const bucketInfo = inject(Store.bucketInfo)

    const getDir = async (bucketName, fileName) => {
      const isSubDir =
        Utils.getCharCount(filePath.value, '/') > 1 ? true : false
      if (!isSubDir) {
        const res = await service.file.changeDir(bucketName, filePath.value)
        bucketInfo.value = res.data.objectList
        filePath.value += bucketName + '/'
      } else {
        const res = await service.file.changeDir(bucketName, fileName)
        bucketInfo.value = res.data.objectList
        filePath.value += Utils.fixedDir(fileName)
      }
    }

    // 右击菜单相关函数
    // const bodyClick = () => {
    //   menuVisible.value = !menuVisible.value
    //   document.body.removeEventListener('click', bodyClick)
    // }

    // const openMenu = e => {
    //   menuVisible.value = !menuVisible.value
    //   location.top = e.clientY + 5 + 'px'
    //   location.left = e.clientX + 5 + 'px'
    //   document.body.addEventListener('click', bodyClick)
    // }

    return {
      bucketInfo,
      // openMenu,
      menuVisible,
      location,
      getDir,
    }
  },
}
</script>

<style lang="scss" scoped>
.booth {
  position: relative;
  min-height: 460px;
  .booth-footer {
    width: 100%;
    position: absolute;
    bottom: -23px;
  }
}
</style>
