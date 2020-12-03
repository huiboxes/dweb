<template>
  <div class="FileOperations">
    <ul class="FileOperations">
      <li><NewFolder /></li>
      <li><Upload v-if="filePath !== '/'" /></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { inject } from 'vue'
import Store from '@/store'

import Upload from './Upload/index.vue'
import NewFolder from './NewFolder/index.vue'

export default {
  components: {
    Upload,
    NewFolder,
  },
  setup() {
    const filePath = inject(Store.filePath)

    return {
      filePath,
    }
  },
}
</script>

<style lang="scss" scoped>
.FileOperations {
  display: flex;
  >li{
    margin: 0 5px;
  }
}
</style>
