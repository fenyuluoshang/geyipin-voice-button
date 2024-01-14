<script setup lang="ts">
import BG from '@/assets/bg.jpg'
import BG_DARK from '@/assets/bg-dark.jpg'
import { useDark } from '@vueuse/core'

const isDark = useDark()

const bg_img = computed(() => (isDark.value ? BG_DARK : BG))
</script>
<template>
  <client-only>
    <img :src="bg_img" class="bg" />
  </client-only>
</template>
<style lang="scss" scoped>
.bg {
  height: calc(100vh - 48px);
  width: 100%;
  position: fixed;
  left: 0;
  top: 48px;
  object-fit: cover;
  z-index: -2;
}
</style>
