<script lang="ts" setup>
defineProps<{ size: 'large' | 'default' | 'small' }>()
</script>
<template>
  <el-form :size="size">
    <el-form-item class="">
      <el-input placeholder="手机号">
        <template #prepend>+86</template>
      </el-input>
    </el-form-item>
    <el-form-item class="">
      <el-input placeholder="验证码" :prefix-icon="ElIconKey">
        <template #append>
          <el-button type="primary">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button class="w-full" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
