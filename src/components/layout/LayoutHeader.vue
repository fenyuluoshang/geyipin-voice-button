<script setup lang="ts">
import Logo from '@/assets/logo.jpg'
</script>

<template>
  <el-header class="header">
    <div class="flex items-center">
      <div class="w-[30px] h-[30px] mr-2">
        <img class="w-full h-full" :src="Logo" />
      </div>
      <span class="text-white font-semibold">鸽一品按钮</span>
    </div>
  </el-header>
</template>

<style lang="scss" scoped>
.header {
  z-index: 5;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: 48px;
  background: linear-gradient(90deg, rgba(184, 42, 13, 0.8), #fff3b7), hsla(0, 0%, 100%, 0.8);
}
</style>
