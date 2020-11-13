<template>
  <ul class="FileOperations">
    <li><button>新建文件夹</button></li>
    <li><button>上传文件</button></li>
  </ul>
</template>

<script lang="ts">
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/scss/mixin.scss';

.FileOperations {
  display: flex;
  flex-direction: row-reverse;

  li > button {
    @include btn(#fff, 0, 8px);
    margin: 0 5px;
    background: #fafafa;

    &:hover {
      color: #47c479;
      border: 1px solid#47c479;
    }
  }
}
</style>
