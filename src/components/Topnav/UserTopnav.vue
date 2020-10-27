<template>
<div class="container">
  <div class="UserTopnav">
    <!-- PC端的LOGO -->
    <router-link to="/dashboard"><img src="../../assets/images/logo.png" width="90" height="29" class="logo"></router-link>

    <!-- 移动端的下拉菜单 -->
  </div>

</div>
</template>

<script lang="ts">
import {
  ref
} from 'vue'
export default {
  components: {

  },
  setup() {

    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';

.container {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  top: 0;
  left: 0;

  .UserTopnav {
    @include bar();
    background-color: #fff;

    .dropdownMenu {
      display: none;

      .menuItem {
        >* {
          padding: 5px;
          border: 1px solid red;
        }
      }
    }

    @media (max-width: 500px) {
      .logo {
        display: none;
      }

      .dropdownMenu {
        display: inline;
      }
    }
  }
}
</style>
