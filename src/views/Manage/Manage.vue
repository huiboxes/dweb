<template>
  <UserTopnavVue />
  <div class="body">
    <div class="container">
      <aside class="aside"></aside>
      <main class="booth-wrapper">
        <a-list
          class="demo-loadmore-list"
          :loading="loading"
          item-layout="horizontal"
          :data-source="data"
        >
          <template #loadMore>
            <div
              v-if="showLoadingMore"
              :style="{
                textAlign: 'center',
                marginTop: '12px',
                height: '32px',
                lineHeight: '32px',
              }"
            >
              <a-spin v-if="loadingMore" />
              <!-- <a-button v-else @click="onLoadMore">加载更多</a-button> -->
            </div>
          </template>
          <template #renderItem="{ item }">
            <a-list-item>
              <template #actions>
                <a>edit</a>
                <a>more</a>
              </template>
              <a-list-item-meta
                :description="item.detail"
              >
                <template #title>
                  {{ item.userName }}
                </template>
                <template #avatar>
                  <a-avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </template>
              </a-list-item-meta>
              <div>创建时间：{{new Date(parseInt(item.createTime)).toLocaleString().replace(/:\d{1,2}$/,' ')}}</div>
            </a-list-item>
          </template>
        </a-list>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'
import { List, Spin, Avatar } from 'ant-design-vue'
import service from '@/service'
import UserTopnavVue from '@/components/Topnav/UserTopnav.vue'

export default {
  components: {
    UserTopnavVue,
    'a-list': List,
    'a-spin': Spin,
    'a-avatar': Avatar,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
  },
  setup() {
    const loading = ref(true)
    const loadingMore = ref(false)
    const showLoadingMore = ref(true)
    const data = ref([])

    const getData = async callback => {
      const { data } = await service.user.getUserList()
      callback(data)
    }

    onMounted(() => {
      getData(res => {
        loading.value = false
        data.value = res.data
      })
    })

    const onLoadMore = () => {
      loadingMore.value = true
      getData(res => {
        data.value = data.value.concat(res.data)
        loadingMore.value = false
        nextTick(() => {
          window.dispatchEvent(new Event('resize'))
        })
      })
    }

    return {
      loading,
      loadingMore,
      showLoadingMore,
      data,
      onLoadMore,
    }
  },
}
</script>

<style lang="scss" scoped>
.demo-loadmore-list {
  min-height: 350px;
}
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
      background-color: #f4f4f7;
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
