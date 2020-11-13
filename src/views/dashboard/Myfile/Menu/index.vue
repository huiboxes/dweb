<template>
  <div>
    <a-menu class="bucketMenu">
      <a-menu-item>新建文件</a-menu-item>
      <a-menu-item>下载文件</a-menu-item>
      <a-menu-item>删除文件</a-menu-item>
      <a-menu-item>修改文件名</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { Menu } from 'ant-design-vue'

export default {
  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item,
  },
}
</script>

<style lang="scss" scoped>
.bucketMenu {
  width: 120px;
  border-radius: 4px;
  background-color: rgba($color: #DFDEDE, $alpha: .9);
  > li {
    text-align: center;
    &:hover {
      color: #47c479;
    }
  }
}
</style>
