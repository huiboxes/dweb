<template>
  <div class="bucket-wrapper">
    <div
      class="bucket"
      v-for="(item, index) in bucketInfo"
      :key="index"
      :title="item.detail"
      :class="{ active: selectedBucket === index }"
      @click="selectedBucket = index"
      @dblclick="bucketEmit($event)"
    >
      <span class=" logo"></span>
      <h2 class="title">{{ item.bucketName }}</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue'
import Store from '@/store'

export default {
  props: {
    bucketInfo: Array,
    title: Object,
  },
  setup(props, ctx) {
    const selectedBucket = ref(false)
    const bucketEmit = e => {
      const bucketName = e.srcElement.innerText
      ctx.emit('bucket-emit', bucketName)
    }
    const filePath: string = inject(Store.filePath)
    console.log(filePath.value)
    return {
      selectedBucket,
      bucketEmit,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.bucket-wrapper {
  display: flex;
  flex-wrap: wrap;

  .bucket {
    margin: 0 1rem;
    padding: 5px;
    border: 1px solid transparent;
    position: relative;
    overflow: hidden;

    &.active {
      background-color: lightblue;
      border: 1px solid #11a6fe;
      box-sizing: content-box;
    }

    .logo {
      @include bgImg(64px, 64px, '../../../../assets/svg/bucket.svg');
    }

    .title {
      width: 100%;
      text-align: center;
      line-height: 142px;
      font-size: 15px;
      font-weight: bold;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
