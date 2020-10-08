<template>
<div>
  <p class="logo"><img src="../assets/images/logo.png" width="90" height="29" alt=""></p>

  <div class="links">
    <router-link to="/help">使用帮助</router-link>
    <router-link to="/help">数据安全</router-link>
    <router-link to="/help">服务协议</router-link>
    <router-link to="/register">快速注册</router-link>
  </div>
</div>
</template>

<style lang="scss" scoped>
.logo {
  text-align: center;
}

.links {
  padding: 6px 0 16px;
  margin: auto;
  text-align: center;
  border-top: 1px solid #E8E8E8;
  max-width: 470px;

  >a {
    margin: 0 0.5em;
    color: #8c8c8c;
    font-size: 14px;

    &:last-of-type {
      color: #47C479;
    }
  }

}
</style>
