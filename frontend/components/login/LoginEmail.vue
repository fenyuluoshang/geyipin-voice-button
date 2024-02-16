<script lang="ts" setup>
defineProps<{ size: 'large' | 'default' | 'small' }>()
</script>
<template>
  <el-form :size="size">
    <el-form-item class="">
      <el-input :prefix-icon="ElIconUserFilled" />
    </el-form-item>
    <el-form-item class="">
      <el-input :prefix-icon="ElIconLock" />
    </el-form-item>
    <el-form-item>
      <el-button class="w-full" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
