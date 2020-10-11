<template>
<div class="topnav">
  <div class="logo">
    <router-link to="/index"><img src="../assets/images/logo.png" width="120" height="38" alt=""></router-link>

  </div>
  <ul class="menu">
    <li>
      <router-link class="menuItem" to="/help">产品功能</router-link>
    </li>
    <li>
      <router-link class="menuItem" to="/joinus">加入我们</router-link>
    </li>
    <li>
      <router-link class="login" to="/login">登录</router-link>
    </li>
    <li>
      <router-link class="register" to="/register">快速注册</router-link>
    </li>
  </ul>
</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';

.topnav {
  @include bar();

  >.logo {
    margin-right: auto;
  }

  >.menu {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;

    >li {
      margin: 0 .2em;

      .menuItem {
        display: inline-block;
        padding: 8px 24px;
      }

      .login {
        @include btn(linear-gradient(#FEFEFE, #F6F6F6));
        color: #595959;
      }

      .login:hover {
        border: 1px solid #47C479;
        color: #47C479;
      }

      .register {
        @include btn(#25B864, 8px);
        color: #fff;
        border: none;
      }

      .register:hover {
        background-color: #47C479;
      }

      @media (max-width: 500px) {
        .menuItem {
          display: none;
        }
      }
    }
  }
}
</style>
