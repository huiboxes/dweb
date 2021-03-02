<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item ref="username" label="用户名" name="username">
      <a-input v-model:value="formState.username" placeholder="6~15位" />
    </a-form-item>

    <a-form-item ref="password" label="密码" name="password">
      <a-input
        v-model:value="formState.password"
        type="password"
        placeholder="不少于6位"
      />
    </a-form-item>

    <a-form-item label="角色" name="role">
      <a-radio-group v-model:value="formState.role">
        <a-radio value="USER">普通用户</a-radio>
        <a-radio value="ADMIN">管理员</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="用户备注" name="desc">
      <a-textarea v-model:value="formState.desc" placeholder="选填" />
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 14, offset: 4 }"
      style="text-align: center;"
    >
      <a-button type="primary" @click="onSubmit" block>创建</a-button>
      <!-- <a-button style="margin-left: 10px" @click="resetForm">重置</a-button> -->
    </a-form-item>
  </a-form>
</template>
<script>
import service from '@/service'
import { Button, Form, Input, message, Radio } from 'ant-design-vue'
import { defineComponent, reactive, ref, toRaw } from 'vue'
export default defineComponent({
  components: {
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-textarea': Input.TextArea,
    'a-radio': Radio,
    'a-radio-group': Radio.Group,
    'a-button': Button,
  },
  setup() {
    const formRef = ref()

    const formState = reactive({
      username: '',
      password: '',
      role: 'USER',
      desc: '',
    })
    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 15,
          message: '长度必须在6~15位之间',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 15,
          message: '不得小于6位',
          trigger: 'blur',
        },
      ],
    }

    const onSubmit = () => {
      formRef.value.validate().then(() => {
        const { username, password, role, desc } = toRaw(formState)
        service.user
          .useradd(username, password, role, desc)
          .then(({ data }) => {
            if (data.code === 200) {
              message.success(`成功添加用户${username}`)
            }
          })
      })
    }

    const resetForm = () => {
      formRef.value.ruleformState.resetFields()
    }

    return {
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      other: '',
      formState,
      rules,
      onSubmit,
      resetForm,
    }
  },
})
</script>
