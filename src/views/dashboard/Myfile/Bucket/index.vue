<template>
  <div
    class="fileBar"
    v-for="(b, index) in bucketInfo"
    :key="'b' + index"
    :title="b.bucketName"
    :class="{ active: selectedFile === index }"
    @click="selectedFile = index"
    @dblclick="bucketEmit(b)"
  >
    <div class="file-left">
      <span :class="b.length ? 'fileIcon' : 'bucketIcon'"></span>
      <h2 class="title">{{ b.bucketName || b.name }}</h2>
    </div>
    <ul class="file-right">
      <li class="fileLength" v-if="b.length > 0">
        大小：{{ (b.length / 1000000).toFixed(1) }} MB
      </li>
      <li class="deleteFile" @click="deleteFile">
        删除
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { inject, ref } from 'vue'
import Store from '@/store'
import service from '@/service'
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
      const bucketName = b.bucketName || Utils.getBucketName(filePath.value)
      const fileName = b.key
      emit('bucket-emit', bucketName, fileName)
    }

    const deleteFile = async e => {
      if (confirm('确定要删除吗？')) {
        const currentItem = e.target.parentElement.parentElement
        const currentName = currentItem.querySelector('h2.title').textContent
        const isFile = e.currentTarget.parentElement.querySelector('.fileLength')
        
        if (filePath.value === '/') {
          currentItem.parentElement.removeChild(currentItem)
          const { status } = await service.file.deleteBucket(currentName)
          Utils.tips(status,'删除文件夹')
        }else if(isFile){
          
          return
        }
        
        console.log(filePath.value);
      }
    }

    return {
      selectedFile,
      bucketEmit,
      deleteFile,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.fileBar {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(#888, 0.1);
  border-bottom: 1px solid rgba(#888, 0.1);
  margin-top: -1px;
  &.active {
    background-color: rgba(#edf8f1, 0.5);
    border-color: rgba(#9cd6b5, 0.5);
  }

  .bucketIcon {
    @include bgImg(32px, 32px, '../../../../assets/svg/bucket.svg');
  }
  .fileIcon {
    @include bgImg(32px, 32px, '../../../../assets/svg/files.svg');
    // margin-top: 8px;
    vertical-align: bottom;
  }
  .title {
    margin-left: 0.5em;
    display: inline-block;
    font-size: 15px;
    font-weight: normal;
    vertical-align: bottom;
  }
  .file-left {
    padding-left: 1em;
    > * {
      padding-top: 0.5em;
    }
  }
  .file-right {
    padding-right: 1em;
    display: flex;
    > li {
      margin: 0 5px;
    }
    > .deleteFile {
      transform: translateY(35%);
    }
    > .fileLength {
      display: inline-block;
      padding-top: 1em;
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>
