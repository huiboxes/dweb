<template>
  <div class="booth">
    <!-- @contextmenu.prevent="openMenu($event)" -->
    <FileOperations />
    <Bucket :bucketInfo="bucketInfo" @bucketEmit="getDir" />
    <BucketMenu :style="location" v-if="menuVisible" />
  </div>
</template>

<script lang="ts">
import { inject, onMounted, provide, reactive, ref } from 'vue'
import Axios from 'axios'
import Store from '@/store'

import Bucket from './Bucket/index.vue'
import BucketMenu from './Menu/index.vue'
import FileOperations from './FileOperations/index.vue'
import { servicePath } from '@/config/apiUrl'
import Utils from '@/util'

export default {
  components: {
    Bucket,
    BucketMenu,
    FileOperations,
  },
  setup() {
    const bucketInfo = ref([])
    const menuVisible = ref(false)
    const location = reactive({
      position: 'absolute',
      top: '0',
      left: '0',
    })

    provide(Store.filePath, ref(''))
    const filePath: any = inject(Store.filePath)

    onMounted(async () => {
      const res = await Axios({
        method: 'GET',
        url: servicePath.getBucketList,
      })
      filePath.value = '/'
      bucketInfo.value = [...res.data]
    })

    const getDir = async (bucketName,fileName) => {
      const isSubDir =
        Utils.getCharCount(filePath.value, '/') > 1 ? true : false
      if (!isSubDir) {
        const res = await Axios({
          method: 'GET',
          url: servicePath.getFilesList,
          params: {
            bucket: bucketName,
            dir: filePath.value,
          },
        })
        bucketInfo.value = res.data.objectList
        filePath.value += bucketName + '/'
      }else{
        const res = await Axios({
          method: 'GET',
          url: servicePath.getFilesList,
          params: {
            bucket: bucketName,
            dir: fileName,
          },
        })
        bucketInfo.value = res.data.objectList
        filePath.value += fileName.substr(1)
      }
      
      console.log(filePath.value)
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
  min-height: 460px;
}
</style>
