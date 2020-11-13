<template>
  <div class="body">
    <div class="container">
      <aside class="aside">
        <Aside :todoItem="todoItem" />
      </aside>
      <main class="booth-wrapper">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Aside from '../../components/Aside/index.vue'

export default {
  components: {
    Aside,
  },
  setup() {
    const todoItem = {
      最近使用: 'recently',
      我的文件: 'myfile',
      隐藏空间: 'private',
      回收站: 'recycle',
    }

    return {
      todoItem,
    }
  },
}
</script>

<style lang="scss" scoped>
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
    }

    .booth-wrapper {
      padding: 0.7rem;
      flex: 8;
    }
  }
}
</style>
