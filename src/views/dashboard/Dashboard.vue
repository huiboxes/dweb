<template>
  <div class="body">
    <div class="container">
      <aside class="aside">
        <Aside />
      </aside>
      <main class="booth-wrapper">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { provide, inject, ref, onMounted } from 'vue'
import Aside from './Myfile/Aside/index.vue'
import Store from '@/store'
import service from '@/service'

export default {
  components: {
    Aside,
  },
  setup() {
    provide(Store.filePath, ref('/'))
    provide(Store.bucketInfo, ref([]))

    const bucketInfo = inject(Store.bucketInfo)

    onMounted(async () => {
      const res = await service.file.init()
      bucketInfo.value = res.data
    })
  },
  // setup() {
  //   const todoItem = {
  //     最近使用: 'recently',
  //     我的文件: 'myfile',
  //     隐藏空间: 'private',
  //     回收站: 'recycle',
  //   }

  //   return {
  //     todoItem,
  //   }
  // },
}
</script>

<style lang="scss" scoped>
.body {
  width: 100vw;
  height: 100vh;
  background-color: #fafafa;

  .container {
    padding-top: 2rem;
    max-width: 1216px;
    margin: auto;
    display: flex;

    .aside {
      flex: 2;
      min-width: 120px;
      background-color: #F4F4F7;
      overflow: hidden;
      border-radius: 8px;
    }

    .booth-wrapper {
      padding: 0.7rem;
      flex: 8;
    }
  }
}
</style>
