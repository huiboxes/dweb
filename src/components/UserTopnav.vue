<template>
<div class="container">
  <div class="UserTopnav">
    <!-- PC端的LOGO -->
    <router-link to="/dashboard"><img src="../assets/images/logo.png" width="90" height="29" class="logo"></router-link>

    <!-- 移动端的下拉菜单 -->
    <Dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        Hover me, Click menu item
        <DownOutlined />
      </a>
      <template v-slot:overlay>
        <Menu @click="onClick">
          <a-menu-item key="1">
            1st menu item
          </a-menu-item>
          <a-menu-item key="2">
            2nd menu item
          </a-menu-item>
          <a-menu-item key="3">
            3rd menu item
          </a-menu-item>
        </Menu>
      </template>
    </Dropdown>

  </div>

</div>
</template>

<script lang="ts">
import {
  ref
} from 'vue'
import {
  Dropdown,
  Menu
} from 'ant-design-vue'
import {
  DownOutlined
} from '@ant-design/icons-vue'
export default {
  components: {
    Dropdown,
    DownOutlined,
    Menu
  },
  setup() {
    const onClick = ({
      key
    }) => {
      console.log(`Click on item ${key}`)
    }
    return {
      onClick,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';

.container {
  margin-bottom: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.06);

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
