<template>
  <a-tree
  
    :load-data="onLoadData"
    :tree-data="treeData"
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
  />
</template>
<script>
import { inject, defineComponent, ref, onMounted } from 'vue'
import { Tree } from 'ant-design-vue'
import Store from '@/store'
import Utils from '@/util'
import service from '@/service'

export default defineComponent({
  components: {
    'a-tree': Tree.DirectoryTree,
    
  },
  setup() {
    const expandedKeys = ref([])
    const selectedKeys = ref([])

    const filePath = inject(Store.filePath)
    const bucketInfo = inject(Store.bucketInfo)
    const buckets = []

    let clickCount = 0

    // const listFile = fileList => {
    //   const tempBuckets = []
    //   for (const bucket of fileList.value) {
    //     tempBuckets.push({
    //       title: bucket.bucketName,
    //       key: bucket.bucketId,
    //     })
    //   }

    //   return tempBuckets
    // }

    onMounted(async () => {
      const res = await service.file.init()

      for (const bucket of res.data) {
        buckets.push({
          title: bucket.bucketName,
          key: bucket.bucketId,
        })
      }
    })

    const treeData = ref([
      {
        title: '此空间',
        key: '0',
      },
    ])

    const onLoadData = treeNode => {
      return new Promise(resolve => {
        clickCount += 1

        if (treeNode.dataRef.children) {
          resolve()
          return
        }

        if (clickCount === 1) {
          treeNode.dataRef.children = buckets
          treeData.value = [...treeData.value]
        } else {
          const buckets = []
          const isSubDir =
            Utils.getCharCount(filePath.value, '/') > 1 ? true : false
          if (!isSubDir) {
            service.file.changeDir(treeNode.title, filePath.value).then(res => {
              filePath.value += treeNode.title + '/'
              bucketInfo.value = res.data.objectList

              for (const bucket of bucketInfo.value) {
                if (bucket.length === 0) {
                  buckets.push({
                    title: bucket.name,
                    key: bucket.key,
                  })
                }
                // 是否显示文件
                //  else {
                //   buckets.push({
                //     title: bucket.name,
                //     key: bucket.id,
                //     isLeaf: true,
                //   })
                // }
              }
              treeNode.dataRef.children = buckets
              treeData.value = [...treeData.value]
            })
          } else {
            const bucketName = Utils.getBucketName(filePath.value)
            const dir =
              filePath.value.slice(bucketName.length + 1) + treeNode.title + '/'
            service.file.changeDir(bucketName, dir).then(res => {
              filePath.value += Utils.fixedDir(`/${treeNode.title}/`)
              bucketInfo.value = res.data.objectList

              for (const bucket of bucketInfo.value) {
                if (bucket.length === 0) {
                  buckets.push({
                    title: bucket.name,
                    key: bucket.key,
                  })
                }
                //  else {
                //   buckets.push({
                //     title: bucket.name,
                //     key: bucket.id,
                //     isLeaf: true,
                //   })
                // }
              }

              treeNode.dataRef.children = buckets
              treeData.value = [...treeData.value]
            })
          }
        }
        resolve()
      })
    }

    return {
      expandedKeys,
      selectedKeys,
      treeData,
      onLoadData,
    }
  },
})
</script>
