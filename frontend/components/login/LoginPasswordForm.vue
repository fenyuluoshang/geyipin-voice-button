<script lang="ts" setup>
import useUserStore from '~/stores/user'

useHead({
  script: [
    {
      src: 'https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js',
      type: 'text/javascript',
      onload: () => initAliCaptcha()
    }
  ]
})

defineProps<{ size: 'large' | 'default' | 'small' }>()

const form = ref({
  userName: '',
  password: ''
})

const captchaRef = ref<any>()

function getInstance(instance: any) {
  captchaRef.value = instance
}

const nuxtApp = useNuxtApp()

const userStore = useUserStore()

async function captchaVerifyCallback(captchaVerifyParam: string) {
  const result = await nuxtApp.$axios.post('/api/user/login', {
    captchaVerifyParam,
    ...form.value
  })
  if (result.data.code === 1) {
    await userStore.setToken(result.data.data.jwt)
    return {
      captchaResult: true,
      bizResult: true
    }
  }
  if (result.data.code === 10001) {
    ElMessage.error('错误的账号或密码')
  }
  return {
    captchaResult: result.data.code !== 10002,
    bizResult: false
  }
}

const router = useRouter()

function onBizResultCallback(bizResult: boolean) {
  if (bizResult) {
    router.push('/admin')
  }
}

function initAliCaptcha() {
  // @ts-ignore
  window.initAliyunCaptcha?.({
    SceneId: '17jumwpn',
    prefix: '5v2eub',
    mode: 'popup',
    element: '#captcha-element',
    button: '#login-button',
    captchaVerifyCallback: captchaVerifyCallback,
    onBizResultCallback: onBizResultCallback,
    getInstance: getInstance,
    slideStyle: {
      width: 360,
      height: 40
    },
    language: 'cn'
  })
}

onMounted(() => {
  initAliCaptcha()
})
</script>
<template>
  <el-form :model="form" :size="size">
    <el-form-item class="">
      <el-input
        placeholder="账号/邮箱/手机号"
        v-model="form.userName"
        :prefix-icon="ElIconUserFilled"
      />
    </el-form-item>
    <el-form-item class="">
      <el-input placeholder="密码" v-model="form.password" :prefix-icon="ElIconLock" />
    </el-form-item>
    <el-form-item>
      <div id="captcha-element"></div>
      <el-button id="login-button" class="w-full" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
