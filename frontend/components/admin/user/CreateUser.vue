<script lang="ts" setup>
import { useVModel } from '@vueuse/core'
import { FormInstance } from 'element-plus'

const props = withDefaults(
  defineProps<{
    modelValue?: boolean
  }>(),
  {
    modelValue: false
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'success'): void
}>()

const visible = useVModel(props, 'modelValue', emit)

const form = ref({
  username: '',
  nickName: '',
  password: '',
  mail: '',
  phone: ''
})

const formComponent = ref<FormInstance>()

const nuxtApp = useNuxtApp()

async function submit() {
  await formComponent.value?.validate()
  const result = await nuxtApp.$axios.put('/api/admin/user', form.value)
  if (result.data.code === 1) {
    visible.value = false
    ElMessage.success('新增用户成功')
    emit('success')
  }
}
</script>
<template>
  <el-dialog v-model="visible" title="新增用户">
    <el-form ref="formComponent" :model="form" label-width="100">
      <el-form-item prop="username" label="用户名" required>
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="nickName" label="昵称" required>
        <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" required>
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="mail" label="邮箱">
        <el-input v-model="form.mail" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码">
        <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="submit">提交</el-button>
    </template>
  </el-dialog>
</template>
