import { ref } from 'vue'
<template>
<div class="body">
  <div class="container">

  </div>
</div>
</template>

<script lang="ts">
import {
  ref
} from 'vue'

import Topnav from '../../components/Topnav.vue'

export default {
  components: {
    Topnav,
  },
  setup(props, context) {

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
