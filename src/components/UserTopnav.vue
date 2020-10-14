<template>
<div class="container">
  <div class="UserTopnav">

    <!-- <router-link to="/dashboard"><img src="../assets/images/logo.png" width="90" height="29" class="logo"></router-link> -->

  </div>

</div>
</template>

<script lang="ts">
import {
  ref
} from 'vue'

export default {
  setup() {
    const fileList = ref([])
    const headers = ref({
      authorization: 'authorization-text',
    })

    const handleChange = (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/mixin.scss';

.container {
  margin-bottom: 2px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .06), 0 1px 2px 0 rgba(0, 0, 0, .06);

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
