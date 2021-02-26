<template>
  <div v-show="!bucketInfo.length">
    <Empty description="该目录暂无数据哦" class="tipEmpty" />
  </div>
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
      <span :class="b.length ? 'fileIcon' : 'bucketIcon'">
        <img src="" alt="" v-if="b.length" />
      </span>
      <h2 class="title">{{ b.bucketName || b.name }}</h2>
    </div>
    <ul class="file-right">
      <li class="fileLength" v-if="b.length">
        <img
          src="@/assets/fileIcons/size.svg"
          alt="大小"
          width="15"
          height="15"
        />
        :
        {{
          b.length > 100000
            ? (b.length / 1000000).toFixed(1) + `MB`
            : (b.length / 1000).toFixed(1) + `KB`
        }}
      </li>
      <li class="deleteFile" @click="deleteFile">
        <img
          src="@/assets/fileIcons/trash.svg"
          alt="删除"
          width="15"
          height="15"
        />
      </li>
      <li class="download" @click="download" v-if="b.length">
        <img
          src="@/assets/fileIcons/download.svg"
          alt="下载"
          width="15"
          height="15"
        />
      </li>
    </ul>
    <slot></slot>
  </div>
</template>

<script>
import { inject , ref } from 'vue'
import { Empty } from 'ant-design-vue'
import Store from '@/store'
import service from '@/service'
import Utils from '@/util'
import { ipUrl } from '@/config/apiUrl'

export default {
  components: {
    Empty,
  },
  props: {
    bucketInfo: Array,
  },

  emits: ['bucketEmit'],
  setup(props, { emit }) {
    const selectedFile = ref(false)
    const filePath = inject(Store.filePath)

    const bucketEmit = b => {
      const bucketName = b.bucketName || Utils.getBucketName(filePath.value)
      const fileName = b.key
      emit('bucket-emit', bucketName, fileName)
    }

    const deleteFile = async e => {
      if (confirm('确定要删除吗？')) {
        const currentItem = e.target.parentElement.parentElement.parentElement
        const currentName = currentItem.querySelector('h2.title').textContent
        const bucketName = Utils.getBucketName(filePath.value)
        const isFile = e.currentTarget.parentElement.parentElement.querySelector(
          '.fileLength'
        )

        if (filePath.value === '/') {
          currentItem.parentElement.removeChild(currentItem)
          const { status } = await service.file.deleteBucket(currentName)
          Utils.tips(status, '删除文件夹')
        } else if (isFile) {
          currentItem.parentElement.removeChild(currentItem)
          const key = filePath.value.split(bucketName)[1] + currentName
          const { status } = await service.file.deleteFile(bucketName, key)
          Utils.tips(status, '删除文件')
        } else {
          const key = filePath.value.split(bucketName)[1] + currentName + '/'
          try {
            await service.file.deleteDir(bucketName, key)
            alert('删除文件夹成功')
            currentItem.parentElement.removeChild(currentItem)
          } catch (error) {
            alert('文件夹不为空，不能删除')
          }
        }
      }
    }

    const download = e => {
      const bucketName = Utils.getBucketName(filePath.value)
      const currentItem = e.target.parentElement.parentElement.parentElement
      const currentName = currentItem.querySelector('h2.title').textContent
      const key = filePath.value.split(bucketName)[1] + currentName

      const url = `${ipUrl}/dx/object/content?bucket=${bucketName}&key=${key}`
      const a = document.createElement('a')
      a.href = url
      a.crossOrigin = 'Anonymous'
      a.download = currentName
      a.target = '_blank'
      a.click()
    }

    return {
      selectedFile,
      bucketEmit,
      deleteFile,
      download,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.tipEmpty {
  margin: 2rem 2rem 0 0;
}

.fileBar {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(#888, 0.1);
  border-bottom: 1px solid rgba(#888, 0.1);
  margin-top: -1px;
  &.active {
    background-color: rgba(#cde5f8, 0.5);
    border-color: rgba(#b1d1f7, 0.5);
  }

  .bucketIcon {
    @include bgImg(32px, 32px, '../../../../assets/svg/bucket.svg');
  }
  .fileIcon {
    @include bgImg(32px, 32px, '../../../../assets/svg/files.svg');
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
    > .deleteFile,
    .download {
      transform: translateY(35%);
      -webkit-user-select: none;
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
