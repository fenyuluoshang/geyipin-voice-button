<script lang="ts" setup>
import IconPasswordIcon from '@/components/icon/PasswordIcon.vue'

defineProps<{ size: 'large' | 'default' | 'small' }>()
</script>
<template>
  <el-form :size="size">
    <el-form-item class="">
      <el-input :prefix-icon="ElIconUserFilled" />
    </el-form-item>
    <el-form-item class="">
      <el-input :prefix-icon="IconPasswordIcon" />
    </el-form-item>
    <el-form-item>
      <el-button class="w-full" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</template>
