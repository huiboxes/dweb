import { ref } from 'vue'
<template>
<div class="body">
  <div class="container">
    <!--
    <a-list item-layout="horizontal" :data-source="data">
      <template v-slot:renderItem="{ item, index }">
        <a-list-item>
          <a-list-item-meta description="Ant Design, a design language for background applications, is refined by Ant UED Team">
            <template v-slot:title>
              <a href="https://www.antdv.com/">{{ item.title }}</a>
            </template>
            <template v-slot:avatar>
              <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list> 
    -->
    <a-upload v-model:fileList="fileList" name="file" :multiple="true" action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers" @change="handleChange">
      <a-button>
        <upload-outlined /> Click to Upload
      </a-button>
    </a-upload>
  </div>
</div>
</template>

<script lang="ts">
import {
  ref
} from 'vue'

import Topnav from '../../components/Topnav.vue'

export default {
  components: {
    Topnav
  },
  setup(props, context) {
    /*const data = [{
        title: 'Ant Design Title 1',
      },
      {
        title: 'Ant Design Title 2',
      },
      {
        title: 'Ant Design Title 3',
      },
      {
        title: 'Ant Design Title 4',
      }
    ]*/

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

    return {
      /*data,*/
      fileList,
      headers,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  width: 100vw;
  height: 100vh;
  background-color: #FAFAFA;

  .container {
    max-width: 1216px;
    margin: auto;
  }
}
</style>
