<script setup lang="ts">
import BG from '@/assets/bg.jpg'
import BG_DARK from '@/assets/bg-dark.jpg'
import { useConfigStore } from '@/stores/config'
import { usePlayingStore } from '@/stores/playing'
import { useDark } from '@vueuse/core'
import { onBeforeUnmount, onMounted } from 'vue'

const configStore = useConfigStore()
const playingStore = usePlayingStore()

definePageMeta({})

useSeoMeta({
  title: '天才鸽按钮',
  keywords: '鸽一品,天才鸽,虚拟主播,语音按钮',
  description:
    '本站是由粉丝收集整理的主播直播时的语音合集，虚拟主播鸽一品是一名活跃于Bilibili上的UP主，个人势虚拟UP主'
})

useHead({
  style: computed(() => [
    {
      innerHTML: `:root{ --primary-color: ${configStore.config.primary_color}; --second-color: ${configStore.config.second_color}; }`
    },
    {
      innerHTML: `.dark{ --primary-color: ${configStore.config.primary_color_dark}; --second-color: ${configStore.config.second_color_dark}; }`
    }
  ])
})

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

const isDark = useDark()
</script>

<template>
  <div class="mt-[48px] flex-1 relative pb-[80px]">
    <layout-header></layout-header>
    <el-main>
      <img :src="isDark ? BG_DARK : BG" class="bg" />
      <config-panel />
      <voices-panel />
      <div class="mt-[32px]">
        <h2 class="text-white font-[MuYao] text-4xl select-none">投稿 / 友链</h2>
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
        <el-button
          class="submit-link"
          type="success"
          round
          tag="a"
          href="https://www.xrb.icu/"
          target="_blank"
          >小肉包按钮</el-button
        >
        <el-button
          class="submit-link"
          type="success"
          round
          tag="a"
          href="https://www.xxapi.icu/"
          target="_blank"
          >API按钮</el-button
        >
      </div>
      <easter-egg />
    </el-main>
  </div>
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
