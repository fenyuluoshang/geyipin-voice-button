<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import useUserStore from '~/stores/user'

withDefaults(
  defineProps<{ size: 'large' | 'default' | 'small'; showLabel: boolean; buttonFull: boolean }>(),
  {
    size: 'default',
    showLabel: false,
    buttonFull: true
  }
)

const emits = defineEmits<{
  (event: 'success'): void
}>()

const nuxtApp = useNuxtApp()

const formRef = ref<FormInstance>()

const loginForm = ref<{
  phone: string
  code: string
}>({
  phone: '',
  code: ''
})

const timeLimit = ref(0)
const timeLimitInval = ref<ReturnType<typeof setInterval>>()

function createInval() {
  timeLimitInval.value = setInterval(() => {
    timeLimit.value = timeLimit.value - 1
    if (timeLimit.value === 0) {
      clearInterval(timeLimitInval.value)
      timeLimitInval.value = undefined
    }
  }, 1000)
}

async function sendCode() {
  if (timeLimit.value > 0) {
    return
  }
  await formRef.value?.validateField('phone')
  const data = await nuxtApp.$axios.put(`/api/user/send_sms?phone=${loginForm.value.phone}`)
  if (data.data?.code === 1) {
    ElMessage.success('验证码已发送')
    timeLimit.value = 60
    if (!timeLimitInval.value) {
      createInval()
    }
  } else {
    ElMessage.warning('发送失败: ' + data.data?.message)
  }
}

const userStore = useUserStore()

async function loginSubmit() {
  await formRef.value?.validate()
  const data = await nuxtApp.$axios.post('/api/user/login/phone', { ...loginForm.value })
  if (data.data?.code === 1) {
    userStore.setToken(data.data.data.jwt)
    emits('success')
  } else {
    ElMessage.warning('验证失败: ' + data.data?.message)
  }
}
</script>
<template>
  <el-form ref="formRef" :size="size" :model="loginForm" :label-width="showLabel ? '100px' : 0">
    <el-form-item
      required
      :label="showLabel ? '手机号' : undefined"
      prop="phone"
      :rules="[
        {
          required: true,
          len: 11
        }
      ]"
    >
      <el-input placeholder="手机号" v-model="loginForm.phone">
        <template #prepend>+86</template>
      </el-input>
    </el-form-item>
    <el-form-item required :label="showLabel ? '验证码' : undefined" prop="code">
      <el-input placeholder="验证码" :prefix-icon="ElIconKey" v-model="loginForm.code">
        <template #append>
          <el-button type="primary" @click="sendCode">
            <template v-if="timeLimit <= 0">发送验证码</template>
            <template v-else>{{ timeLimit }}s后可再次发送</template>
          </el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button :class="{ 'w-full': buttonFull }" type="primary" @click="loginSubmit">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
