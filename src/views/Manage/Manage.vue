<template>
  <UserTopnav />
  <div class="body">
    <div class="container">
      <aside class="aside">
        <Aside :menuItem="menuItem" />
      </aside>
      <main class="booth-wrapper">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import UserTopnav from '@/components/Topnav/UserTopnav.vue'
import Aside from './Aside'

export default {
  components: {
    UserTopnav,
    Aside,
  },
  setup() {
    const menuItem = [
      { name: '用户列表', src: 'userlist' },
      { name: '添加用户', src: 'useradd' },
    ]

    return {
      menuItem,
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
      min-height: 372px;
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
