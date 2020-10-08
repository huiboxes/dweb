<template>
<div>
  <Topnav />
  <router-view />
  <Footernav />
</div>
</template>

<script lang="ts">
import Topnav from "../../components/Topnav.vue"
import Footernav from '../../components/Footernav.vue'

export default {
  components: {
    Topnav,
    Footernav
  }
}
</script>
