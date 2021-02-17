<template>
  <a-breadcrumb class="filenav-wrapper">
    <a-breadcrumb-item
      v-for="(f, index) in path"
      :key="'f' + index"
      @click="switchPath(f)"
    >
      {{ f }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
import { Breadcrumb } from 'ant-design-vue'
import { inject, ref, watch } from 'vue'
import Store from '@/store'
import Utils from '@/util'

export default {
  components: {
    'a-breadcrumb': Breadcrumb,
    'a-breadcrumb-item': Breadcrumb.Item,
  },
  setup() {
    const filePath: any = inject(Store.filePath)
    const path: any = ref([])

    

    watch(filePath, () => {
      path.value = Utils.parsePath(filePath.value)
    })

    const switchPath = f => {
      console.log(f)
      // console.log(filePath.value)
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
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  &::v-deep span {
    margin: 2px;
  }
  &::v-deep span.ant-breadcrumb-link{
    margin-left: -4px;
  }
}
</style>
