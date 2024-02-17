<script lang="ts" setup>
</script>
<template>
  <el-card>
    <template #header>
      <div class="flex justify-between px-[16px]">
        <div>
          <h2 class="text-lg">手机号验证</h2>
          <p class="mt-[4px] text-sm text-[--text-color-secondary]">
            为了服务器安全考虑，请您先使用手机号进行验证登录，感谢您的理解
          </p>
        </div>
        <div class="text-end">
          <!-- <el-link>切换账号密码登录</el-link><br /> -->
          <!-- <el-link>切换邮箱登录</el-link> -->
        </div>
      </div>
    </template>
    <login-phone show-label class="max-w-[500px]" :button-full="false" />
  </el-card>
</template>
