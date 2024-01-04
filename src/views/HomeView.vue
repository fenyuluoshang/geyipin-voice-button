<script setup lang="ts">
import BG from '@/assets/bg.jpg'
</script>

<template>
  <el-main>
    <img :src="BG" class="bg" />
  </el-main>
</template>

<style lang="scss" scoped>
.bg {
  height: calc(100vh - 48px);
  width: 100%;
  position: fixed;
  left: 0;
  top: 48px;
  object-fit: cover;
}
</style>
