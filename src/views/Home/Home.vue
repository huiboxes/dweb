<template>
<div>
  <Topnav v-if="/^(?!\/dashboard).*/.test(url)" />
  <UserTopnav v-if="/^(\/dashboard).*/.test(url)" class="UserTopnav" />
  <router-view />
  <Footernav />
</div>
</template>

<script lang="ts">
import Topnav from "../../components/Topnav.vue"
import UserTopnav from "../../components/UserTopnav.vue"
import Footernav from '../../components/Footernav.vue'

export default {
  components: {
    Topnav,
    UserTopnav,
    Footernav
  },
  setup() {
    const url = window.location.pathname

    return {
      url
    }
  }
}
</script>
