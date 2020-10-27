<template>
<div class="body">
  <div class="container">
    <Aside />
  </div>
</div>
</template>

<script lang="ts">
import Aside from '../../components/Aside/index.vue'

export default {
  components: {
    Aside
  },
  setup() {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  width: 100vw;
  height: 100vh;
  background-color: #FAFAFA;

  .container {
    max-width: 1216px;
    margin: auto;
  }
}
</style>
