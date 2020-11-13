<template>
  <ul class="asideMenu">
    <li v-for="(value, key, index) in todoItem" :key="index">
      <router-link :to="'/dashboard/' + value">{{ key }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  props: {
    todoItem: Object,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.current {
  color: #25b864;
}

.asideMenu {
  padding: 0 20px;

  /* vue自带的类名 */
  .router-link-active {
    color: #25b864;
  }

  a {
    width: 100%;
    padding: 0 10px;
    display: inline-block;
    line-height: 40px;
    color: #8c8c8c;
    font-size: 15px;

    &:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>
