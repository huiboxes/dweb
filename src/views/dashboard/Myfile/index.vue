<template>
  <div class="booth" @contextmenu.prevent="openMenu($event)">
    <FileOperations />
    <Bucket
      :bucketInfo="bucketInfo"
      @bucketEmit="getBucketInfo"
      @click="isSelected = true"
    />
    <BucketMenu :style="location" v-if="menuVisible" />
  </div>
</template>

<script lang="ts">
import { onMounted, provide, reactive, ref } from 'vue'
import Axios from 'axios'
import Store from '@/store'
import Bucket from './Bucket/index.vue'
import BucketMenu from './Menu/index.vue'
import FileOperations from './FileOperations/index.vue'
import { servicePath } from '@/config/apiUrl'

export default {
  components: {
    Bucket,
    BucketMenu,
    FileOperations
  },
  setup() {
    const bucketInfo = ref([])
    const menuVisible = ref(false)
    const isSelected = ref(false)
    const location = reactive({
      position: 'absolute',
      top: '0',
      left: '0',
    })

    provide(Store.filePath,ref(''))

    onMounted(async () => {
      const res = await Axios({
        method: 'GET',
        url: servicePath.getBucketList,
      })
      bucketInfo.value = [...res.data]
    })

    const getBucketInfo = async bucketName => {
      const res = await Axios({
        method: 'GET',
        url: servicePath.getFilesList,
        params: {
          bucket: bucketName,
          dir: '/',
        },
      })
      console.log(res)
      console.log(bucketName)
    }

    // 右击菜单相关函数
    const bodyClick = () => {
      menuVisible.value = !menuVisible.value
      document.body.removeEventListener('click', bodyClick)
    }

    const openMenu = e => {
      if (isSelected.value) {
        menuVisible.value = !menuVisible.value
        location.top = e.clientY + 5 + 'px'
        location.left = e.clientX + 5 + 'px'
        document.body.addEventListener('click', bodyClick)
      }
    }

    return {
      bucketInfo,
      openMenu,
      menuVisible,
      location,
      getBucketInfo,
      isSelected,
    }
  },
}
</script>

<style lang="scss" scoped>
.booth {
  min-height: 460px;
}
</style>
