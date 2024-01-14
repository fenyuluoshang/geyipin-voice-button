<script setup lang="ts">

defineOptions({
  name: 'VoiceButtonPage'
})

definePageMeta({
  layout: 'with-head',
  title: '天才鸽按钮'
})

useSeoMeta({
  title: '天才鸽按钮',
  keywords: '鸽一品,天才鸽,虚拟主播,语音按钮',
  description:
    '本站是由粉丝收集整理的主播直播时的语音合集，虚拟主播鸽一品是一名活跃于Bilibili上的UP主，个人势虚拟UP主'
})

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

const { href, navigate } = useLink({ to: '/mems' })
</script>

<template>
  <el-main>
    <layout-bg />
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
      <el-button class="submit-link" type="success" round tag="a" :href="href" @click="navigate"
        >天才鸽表情</el-button
      >
    </div>
    <easter-egg />
  </el-main>
</template>


