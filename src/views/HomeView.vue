<script setup lang="ts">
import BG from '@/assets/bg.jpg'
import { useConfigStore } from '@/stores/config'
import { usePlayingStore } from '@/stores/playing'
import { onBeforeUnmount, onMounted } from 'vue'

const configStore = useConfigStore()
const playingStore = usePlayingStore()

function onKeyDown(ev: KeyboardEvent) {
  if (configStore.config.in_setting) {
    return ev
  }
  if (!configStore.config.keyboard_binding_mode) {
    return ev
  }
  playingStore.onKeyDown(ev)
}

onMounted(() => {
  configStore.loadStore()
  window.addEventListener('keydown', onKeyDown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <el-main>
    <img :src="BG" class="bg" />
    <config-panel />
    <voice-panel />
    <div class="mt-[32px]">
      <h2 class="text-white font-[MuYao] text-4xl select-none">投稿</h2>
      <el-divider />
      <el-button
        class="submit-link"
        type="success"
        round
        href="mailto:gzj0078@icloud.com?subject=[天才鸽按钮]投稿"
        tag="a"
        target="_blank"
        >邮件投稿</el-button
      >
      <el-button
        class="submit-link"
        type="success"
        round
        tag="a"
        href="https://wj.qq.com/s2/13991165/8aa2/"
        target="_blank"
        >腾讯问卷</el-button
      >
      <!-- <el-button class="submit-link" type="success" round tag="a" target="_blank">Github</el-button> -->
    </div>
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
  z-index: -2;
}
</style>
