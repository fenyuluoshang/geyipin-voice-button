<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { REFRESH_HAS_LOGIN } from './types'

const nuxtApp = useNuxtApp()

const formRef = ref<FormInstance>()

const loginForm = ref<{
  phone: string
  code: string
}>({
  phone: '',
  code: ''
})

async function sendCode() {
  await formRef.value?.validateField('phone')
  const data = await nuxtApp.$axios.put(`/api/user/send_sms?phone=${loginForm.value.phone}`)
  if (data.data?.code === 1) {
    ElMessage.success('验证码已发送')
  } else {
    ElMessage.warning('发送失败: ' + data.data?.message)
  }
}

const reload = inject(REFRESH_HAS_LOGIN)

async function loginSubmit() {
  await formRef.value?.validate()
  const data = await nuxtApp.$axios.post('/api/user/login/phone', { ...loginForm.value })
  if (data.data?.code === 1) {
    localStorage.setItem('jwt', data.data.data.jwt)
    ElMessage.success('验证成功')
    reload?.()
  } else {
    ElMessage.warning('验证失败: ' + data.data?.message)
  }
}
</script>
<template>
  <el-card>
    <template #header>
      <h2 class="ml-[16px] text-lg">手机号验证</h2>
      <p class="ml-[16px] mt-[4px] text-sm text-[--text-color-secondary]">
        为了服务器安全考虑，请您先使用手机号进行验证登录，感谢您的理解
      </p>
    </template>
    <el-form ref="formRef" label-width="100px" class="max-w-[500px]" :model="loginForm">
      <el-form-item
        required
        label="手机号"
        prop="phone"
        :rules="[
          {
            required: true,
            len: 11
          }
        ]"
      >
        <el-input v-model="loginForm.phone" />
      </el-form-item>
      <el-form-item required label="验证码" prop="code">
        <div class="flex gap-[12px] w-full">
          <el-input v-model="loginForm.code" class="flex-1"></el-input>
          <el-button @click="sendCode">发送验证码</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="loginSubmit" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
