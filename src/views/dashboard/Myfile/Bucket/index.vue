<template>
  <nav></nav>
  <div
    class="fileBar"
    v-for="(b, index) in bucketInfo"
    :key="index"
    :title="b.detail"
    :class="{ active: selectedFile === index }"
    @click="selectedFile = index"
    @dblclick="bucketEmit(b)"
  >
    <span class="icon"></span>
    <h2 class="title">{{ b.bucketName || b.name }}</h2>
  </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue'
import Store from '@/store'
import Utils from '@/util'

export default {
  props: {
    bucketInfo: Array,
  },
  emits: ['bucketEmit'],
  setup(props, { emit }) {
    const selectedFile = ref(false)
    const filePath: any = inject(Store.filePath)

    const bucketEmit = b => {
      console.log(b)
      const bucketName = b.bucketName || Utils.getBucketName(filePath.value)
      const fileName = b.key
      emit('bucket-emit', bucketName,fileName)
    }

    return {
      selectedFile,
      bucketEmit,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.fileBar {
  border-top: 1px solid rgba(#888, 0.1);
  border-bottom: 1px solid rgba(#888, 0.1);
  margin-top: -1px;
  &.active {
    background-color: rgba(#edf8f1, 0.5);
    border-color: rgba(#9cd6b5, 0.5);
  }
  .icon {
    @include bgImg(32px, 32px, '../../../../assets/svg/bucket.svg');
  }
  .title {
    margin-left: 0.5em;
    display: inline-block;
    font-size: 15px;
    font-weight: normal;
    vertical-align: bottom;
  }
}
</style>
