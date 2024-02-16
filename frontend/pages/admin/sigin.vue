<script setup lang="ts">
import BG from '@/assets/wallhaven-85oy2j.png'

const radio1 = ref(0)

definePageMeta({
  layout: 'default'
})
</script>
<template>
  <div
    class="h-[100vh] min-h-[700px] min-w-[600px] bg-center bg-cover relative"
    :style="{ backgroundImage: `url(${BG})` }"
  >
    <div
      class="w-1/4 h-3/5 min-w-[480px] min-h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-55 rounded-3xl z-10 backdrop-blur p-[32px] text-white"
    >
      <h2 class="pt-[16%] pb-[12px] text-center text-2xl font-bold">管理员登录</h2>
      <div class="pb-[8%] text-center">
        管理员守则：为了保护各位虚拟主播及本站的安全，请各位管理员谨慎使用审核权力。
      </div>
      <el-radio-group v-model="radio1" size="large" class="w-full flex mb-[6%]">
        <el-radio-button class="flex-1" :label="0">账号/邮箱密码</el-radio-button>
        <!-- <el-radio-button class="flex-1" :label="1">邮箱验证码</el-radio-button> -->
        <el-radio-button class="flex-1" :label="2">手机验证码</el-radio-button>
      </el-radio-group>
      <login-password-form v-if="radio1 === 0" size="large" />
      <login-phone v-else-if="radio1 === 2" size="large" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.el-radio-button {
  :deep(.el-radio-button__inner) {
    width: 100%;
  }
}
</style>
