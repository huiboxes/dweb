<template>
<div>
  <Topnav v-if="/^(?!\/dashboard).*/.test(url)" />
  <UserTopnav v-if="/^(\/dashboard).*/.test(url)" class="UserTopnav" />
  <router-view />
  <Footernav />
</div>
</template>

<script lang="ts">
import Topnav from '../../components/Topnav/Topnav.vue'
import UserTopnav from '../../components/Topnav/UserTopnav.vue'
import Footernav from '../../components/Footernav/index.vue'

export default {
  components: {
    Topnav,
    UserTopnav,
    Footernav
  },
  setup() {
    const url = window.location.pathname

    return {
      url,
    }
  },
}
</script>
