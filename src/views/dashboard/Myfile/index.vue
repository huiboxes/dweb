<template>
  <div class="booth">
    <Filenav />
    <!-- @contextmenu.prevent="openMenu($event)" -->
    <Bucket :bucketInfo="bucketInfo" @bucketEmit="getDir" />
    <BucketMenu :style="location" v-if="menuVisible" />
    <FileOperations class="booth-footer" />
  </div>
</template>

<script lang="ts">
import { inject, onMounted, provide, reactive, ref } from 'vue'
import Store from '@/store'

import Bucket from './Bucket/index.vue'
import BucketMenu from './Menu/index.vue'
import FileOperations from './FileOperations/index.vue'
import Utils from '@/util'
import service from '@/service'
import Filenav from './Filenav/index.vue'

export default {
  components: {
    Bucket,
    BucketMenu,
    FileOperations,
    Filenav,
  },
  setup() {
    const bucketInfo = ref([])
    const menuVisible = ref(false)
    const location = reactive({
      position: 'absolute',
      top: '0',
      left: '0',
    })

    provide(Store.filePath, ref('/'))
    const filePath: any = inject(Store.filePath)

    onMounted(async () => {
      const res = await service.file.init()
      bucketInfo.value = res.data
    })

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
    bottom: 0;
  }
}
</style>
