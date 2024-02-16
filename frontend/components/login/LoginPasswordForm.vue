<script lang="ts" setup>
import usePingStore from '~/stores/ping'
import useUserStore from '~/stores/user'

const pingStore = usePingStore()

const scripts = computed(() => {
  if (pingStore.config?.useCapcha) {
    return [
      {
        src: 'https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js',
        type: 'text/javascript',
        onload: () => initAliCaptcha()
      }
    ]
  }
  return []
})

useHead({
  script: scripts
})

defineProps<{ size: 'large' | 'default' | 'small' }>()

const form = ref({
  userName: '',
  password: ''
})

const captchaRef = ref<any>()

const pending = ref(false)

function getInstance(instance: any) {
  captchaRef.value = instance
}

const nuxtApp = useNuxtApp()

const userStore = useUserStore()

const error = ref('')

async function submitForm(captchaVerifyParam?: string) {
  try {
    pending.value = true
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
      error.value = '错误的账号或密码'
    }
    return {
      captchaResult: result.data.code !== 10002,
      bizResult: false
    }
  } finally {
    pending.value = false
  }
}

async function captchaVerifyCallback(captchaVerifyParam: string) {
  return await submitForm(captchaVerifyParam)
}

const router = useRouter()

function onBizResultCallback(bizResult: boolean) {
  if (bizResult) {
    router.push('/admin/home')
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

onBeforeUnmount(() => {
  document.getElementById('aliyunCaptcha-mask')?.remove()
  document.getElementById('aliyunCaptcha-window-popup')?.remove()
})

function onEnterKeyDown() {
  document.getElementById('login-button')?.click?.()
}

async function submit() {
  if (pingStore.config?.useCapcha) {
    return
  }
  const data = await submitForm()
  onBizResultCallback(data.bizResult)
}
</script>
<template>
  <el-form :model="form" :size="size">
    <el-form-item class="">
      <el-input
        placeholder="账号/邮箱/手机号"
        v-model="form.userName"
        :prefix-icon="ElIconUserFilled"
        @keydown.enter="onEnterKeyDown"
      />
    </el-form-item>
    <el-form-item class="">
      <el-input
        type="password"
        placeholder="密码"
        v-model="form.password"
        :prefix-icon="ElIconLock"
        @keydown.enter="onEnterKeyDown"
      />
    </el-form-item>
    <el-form-item :error="error">
      <div id="captcha-element"></div>
      <el-button :loading="pending" id="login-button" class="w-full" type="primary" @click="submit">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>
