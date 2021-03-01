<template>
  <div class="topnav">
    <div class="logo">
      <router-link to="/index">
        <img
          src="../../assets/images/logo.png"
          width="120"
          height="38"
          alt="logo"
        />
      </router-link>
    </div>
    <ul class="dmenu">
      <li>
        <router-link class="dmenuItem" to="/help">产品功能</router-link>
      </li>
      <li>
        <router-link class="dmenuItem" to="/joinus">加入我们</router-link>
      </li>
      <li>
        <router-link class="login" to="/login">登录</router-link>
      </li>
      <!-- <li>
        <router-link class="manage" to="/manage">管理入口</router-link>
      </li> -->
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';

.topnav {
  @include bar();

  > .logo {
    margin-right: auto;
  }

  > .dmenu {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;

    > li {
      margin: 0 0.2em;

      .dmenuItem {
        display: inline-block;
        padding: 8px 24px;
        color: #292929;
      }

      .login {
        @include btn(linear-gradient(#fefefe, #f6f6f6));
        color: #595959;
      }

      .login:hover {
        border: 1px solid #47c479;
        color: #47c479;
      }

      .manage {
        @include btn(#25b864, 8px);
        color: #fff;
        border: none;
      }

      .manage:hover {
        background-color: #47c479;
      }

      @media (max-width: 500px) {
        .dmenuItem {
          display: none;
        }
      }
    }
  }
}
</style>
