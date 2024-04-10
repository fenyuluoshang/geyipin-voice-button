<script setup lang="ts">
import axios from 'axios'
import useDomain from '~/composables/useDomain'

defineOptions({
  name: 'VoiceButtonPage'
})

const anchorStore = useAnchorConfigStore()
const { data: anchorConfig } = await useAsyncData('anchorConfigStore', async () => {
  return await anchorStore.get()
})

definePageMeta({
  layout: 'with-head'
})

useSeoMeta({
  title: () => `${anchorConfig.value?.anchorTitle || '音频'}按钮`,
  keywords: () => {
    const keywords = ['虚拟主播', '语音按钮']
    if (anchorConfig.value?.anchorTitle) {
      keywords.unshift(anchorConfig.value.anchorTitle)
    }
    if (anchorConfig.value?.anchorName) {
      keywords.unshift(anchorConfig.value.anchorName)
    }
    return keywords.join(',')
  },
  description:
    '本站是由粉丝收集整理的主播直播时的语音合集，虚拟主播鸽一品是一名活跃于Bilibili上的UP主，个人势虚拟UP主'
})

useHead({
  link: [{ rel: 'icon', href: () => anchorConfig.value?.favIcon || '/favicon.ico' }]
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

const domainData = useDomain()

const { data } = await useAsyncData(async () => {
  const result = await axios.get('/api/ping', { baseURL: process.env.API_DOMAIN })
  return result.data
})
</script>

<template>
  <el-main :data-test="data?.data?.ff_test" :data-anchor="domainData.anchor">
    <layout-bg />
    <config-panel />
    <voices-panel />
    <div class="mt-[32px]">
      <h2 class="text-white font-[MuYao] text-4xl select-none">投稿 / 友链</h2>
      <el-divider />
      <div class="leading-[54px] flex gap-[6px] flex-wrap">
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
    </div>
    <easter-egg />
  </el-main>
</template>
