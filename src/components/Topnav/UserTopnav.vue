<template>
  <div class="container">
    <div class="UserTopnav">
      <!-- PC端的LOGO -->
      <router-link to="/dashboard">
        <img
          src="../../assets/images/logo.png"
          width="90"
          height="29"
          class="logo"
        />
      </router-link>

      <Button class="logout" @click="logout">退出登录</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { Button } from 'ant-design-vue'

export default {
  components: {
    Button,
  },
  setup() {
    const router = useRouter()
    const logout = () => {
      window.localStorage.removeItem('isLogin')
      router.push('/login')
    }
    return { logout }
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
    display: flex;
    background-color: #fff;
    justify-content: space-between;

    .logout {
      border-radius: 2px;
    }

    @media (max-width: 500px) {
      // .logo {
      //   display: none;
      // }
    }
  }
}
</style>
