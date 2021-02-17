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
import axios from 'axios'
import Store from '@/store'
import Utils from '@/util'
import service from '@/service'

export default defineComponent({
  components: {
    'a-tree': Tree,
  },
  setup() {
    const expandedKeys = ref([])
    const selectedKeys = ref([])

    const filePath = inject(Store.filePath)
    const bucketInfo = inject(Store.bucketInfo)
    const bucketName = Utils.getBucketName(filePath.value)
    const buckets = []

    console.log(bucketInfo.value);

    // for (const bucket of bucketInfo.value) {
    //   console.log(bucket)
    // }

    const treeData = ref([
      {
        title: 'Expand to load',
        key: '0',
      },
      {
        title: 'Expand to load',
        key: '1',
      },
      {
        title: 'Tree Node',
        key: '2',
        isLeaf: true,
      },
    ])

    const onLoadData = treeNode => {
      return new Promise(resolve => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }

        axios({
          method: 'GET',
          url: 'dx/bucket/list',
          // params: {
          //   bucket: bucketName,
          //   dir: filePath.value,
          // },
        }).then(result => {
          console.log(result)
        })

        setTimeout(() => {
          treeNode.dataRef.children = [
            {
              title: 'Child Node',
              key: `${treeNode.eventKey}-0`,
            },
            {
              title: 'Child Node',
              key: `${treeNode.eventKey}-1`,
            },
          ]
          treeData.value = [...treeData.value]
          resolve()
        }, 1000)
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
