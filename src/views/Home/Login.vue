<template>
  <div class="layout-container">
    <form class="form-main">
      <div class="logo-wrapper">
        <router-link to="/index" class="logo"></router-link>
      </div>
      <h1>数据尚云</h1>
      <h2>专业的文件管理系统</h2>
      <div class="username-wrapper">
        <span class="username-img"></span>
        <input
          type="text"
          name="username"
          v-model="username"
          class="username"
          placeholder="账号"
          maxlength="100"
          @keypress.enter="submit"
        />
      </div>
      <div class="password-wrapper">
        <span class="passwrod-img"></span>
        <input
          type="password"
          name="password"
          v-model="password"
          class="password"
          placeholder="密码"
          maxlength="200"
          @keypress.enter="submit"
        />
        <!-- <span class="password-invisible" @click="pwdVisible"></span> -->
      </div>
      <input type="button" value="登录" class="submitBtn" @click="submit" />
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import service from '@/service'

export default {
  setup() {
    const username = ref('')
    const password = ref('')
    const router = useRouter()

    const submit = async () => {
      const logined = await service.login(username.value, password.value)
      if (logined) router.push('/dashboard')
    }

    return {
      username,
      password,
      submit,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';

.layout-container {
  width: 100vw;
  height: 100vh;
  background-color: #fafafa;
  display: inline-flex;
  justify-content: center;

  .form-main {
    background-color: #fff;
    padding: 50px 40px 0 40px;
    margin-top: 100px;
    max-width: 400px;
    height: 500px;

    .logo-wrapper {
      text-align: center;

      .logo {
        @include bgImg(64px, 64px, '../../assets/svg/box.svg');
      }
    }

    h1,
    h2 {
      text-align: center;
    }

    > h1 {
      font-size: 32px;
      color: #262626;
    }

    > h2 {
      font-size: 18px;
      color: #565656;
      padding-bottom: 20px;
    }

    .username-wrapper,
    .password-wrapper {
      display: flex;
      justify-content: space-between;
      padding: 9px 11px;
      margin-top: 0.7em;
      border: 1px solid #d9d9d9;
      border-radius: 4px;

      &:hover,
      &:focus {
        border: 1px solid #47c479;
      }

      .username,
      .password {
        width: 100%;
        border: 0;
        font-size: 14px;
      }

      .username-img {
        @include bgImg(30px, 20px, '../../assets/svg/user.svg');
        margin-left: auto;
      }

      .passwrod-img {
        @include bgImg(30px, 20px, '../../assets/svg/lock.svg');
      }

      // .password-invisible {
      //   @include bgImg(30px, 20px, '../../assets/svg/unVisiable.svg');
      // }

      // .password-visible {
      //   @include bgImg(30px, 20px, '../../assets/svg/visiable.svg');
      // }
    }

    .submitBtn {
      width: 320px;
      color: #ffffff;
      margin-top: 0.7em;
      @include btn(#25b864, 0, 12px);

      &:hover {
        background-color: #47c479;
      }
    }

    @media (max-width: 500px) {
      & {
        margin: 0;
        width: 100vw;
        height: 100vh;
      }

      .submitBtn {
        width: 315px;
      }
    }
  }
}
</style>
