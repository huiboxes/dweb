<template>
  <div
    :style="{
      background: /^(\/dashboard).*/.test(url) ? '#FAFAFA' : '#FFFFFF',
    }"
  >
    <p class="logo">
      <img src="../../assets/images/logo.png" width="90" height="29" alt="" />
    </p>

    <div class="links">
      <router-link to="/help">使用帮助</router-link>
      <router-link to="/help">数据安全</router-link>
      <router-link to="/help">服务协议</router-link>
      <!-- <router-link to="/register" v-if="/^(?!\/dashboard).*/.test(url)"
        >管理员登录</router-link
      > -->
    </div>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const url = window.location.pathname

    return {
      url,
    }
  },
}
</script>

<style lang="scss" scoped>
.logo {
  text-align: center;
}

.links {
  padding: 6px 0 16px;
  margin: auto;
  text-align: center;
  border-top: 1px solid #e8e8e8;
  max-width: 470px;

  > a {
    margin: 0 0.5em;
    color: #8c8c8c;
    font-size: 14px;

    &:nth-child(4) {
      color: #47c479;
    }
  }
}
</style>
