<template>
  <a-tree
    :load-data="onLoadData"
    :tree-data="treeData"
    @expand="onExpand"
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

    onMounted(async () => {
      const res = await service.file.init()

      for (const bucket of res.data) {
        buckets.push({
          title: bucket.bucketName,
          key: `${bucket.bucketId}`,
        })
      }
    })

    const treeData = ref([
      {
        title: '此空间',
        key: '0',
      },
    ])

    const unfoldDir = (bucketInfo, treeNode, treeData) => {
      const buckets = []
      for (const bucket of bucketInfo) {
        if (bucket.length === 0) {
          buckets.push({
            title: bucket.name,
            key: bucket.key,
          })
        }
      }
      treeNode.dataRef.children = buckets
      treeData.value = [...treeData.value]
    }

    const onExpand = (expandedKeys) => {
      if (clickCount > 2) {
        // console.log(expandedKeys)
        // console.log(filePath.value)

        // const current = expandedKeys[expandedKeys.length - 1]
        // const prev = expandedKeys[expandedKeys.length - 2]

        console.log(expandedKeys)

        // console.log(current,prev)
        // console.log(current);
        
        // 点的是bucket
        // if (current.indexOf('/')) {

        //   console.log(current);
        //   // service.file.changeDir(current, '/').then(res => {
        //   //   filePath.value = `/${treeNode.title}/`
        //   //   bucketInfo.value = res.data.objectList

        //   //   unfoldDir(bucketInfo.value, treeNode, treeData)
        //   // })
        // }

        // if (Utils.getCharCount(current, '/') <= Utils.getCharCount(prev, '/')) {
        //   // 当前点的是同级或者上级目录
        //   console.log(66666);
        // }
      }
    }

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
          const isSubDir =
            Utils.getCharCount(filePath.value, '/') > 1 ? true : false
          if (!isSubDir) {
            service.file.changeDir(treeNode.title, filePath.value).then(res => {
              filePath.value += treeNode.title + '/'
              bucketInfo.value = res.data.objectList

              unfoldDir(bucketInfo.value, treeNode, treeData)
            })
          } else {
            if (clickCount >= 3) {
              const expanded = expandedKeys.value
              const next = expanded[expanded.length - 1]
              if (!next.toString().includes('/')) {
                // 是否点击了bucket
                const currentBucket = treeData.value[0].children.filter(
                  item => item.key === next
                )

                service.file
                  .changeDir(currentBucket[0].title, '/')
                  .then(res => {
                    filePath.value = `/${treeNode.title}/`
                    bucketInfo.value = res.data.objectList

                    unfoldDir(bucketInfo.value, treeNode, treeData)
                  })
              } else {
                const bucketName = Utils.getBucketName(filePath.value)
                const dir =
                  filePath.value.slice(bucketName.length + 1) +
                  treeNode.title +
                  '/'
                service.file.changeDir(bucketName, dir).then(res => {
                  filePath.value += Utils.fixedDir(`/${treeNode.title}/`)
                  bucketInfo.value = res.data.objectList
                  unfoldDir(bucketInfo.value, treeNode, treeData)
                })
              }
            }
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
      onExpand,
    }
  },
})
</script>
