<template>
  <ul>
    <li v-for="(l, index) in menuItem" :key="`l${index}`">
      <router-link :to="l.src">{{ l.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    menuItem: Array,
  },
}
</script>

<style lang="scss" scoped>
ul > li {
  cursor: pointer;
  padding: 0.5rem;
  text-align: center;
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    color: #222;
    font-size: 16px;
    &:hover{
      color: #666;
    }
  }
  .router-link-active {
    color: #40a9ff;
  }
  &:hover{
    background-color: #fff;
  }
}
</style>
