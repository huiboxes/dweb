<template>
<div class="container">
  <div class="UserTopnav">
    <router-link to="/dashboard"><img src="../assets/images/logo.png" width="90" height="29" class="logo"></router-link>

  </div>
</div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';

.container {
  margin-bottom: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .06), 0 1px 2px 0 rgba(0, 0, 0, .06);

  .UserTopnav {
    @include bar();
    background-color: #fff;

    @media (max-width: 500px) {
      .logo {
        display: none;
      }
    }
  }

}
</style>
