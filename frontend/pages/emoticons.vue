<script lang="ts" setup>
import { getMemsUrl } from '@/util'

const anchorStore = useAnchorConfigStore()
const { data: anchorConfig } = await useAsyncData('anchorConfigStore', async () => {
  return await anchorStore.get()
})

defineOptions({
  name: 'VoiceButtonPage',
  title: ''
})

definePageMeta({
  layout: 'with-head',
  title: '天才鸽表情'
})

useSeoMeta({
  title: () => `${anchorConfig.value?.anchorTitle || ''}表情`,
  keywords: () => {
    const keywords = ['虚拟主播', '语音按钮', ' 表情包']
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

const memsList = computed(() => {
  return configStore.config.mems.map((item) => getMemsUrl(item))
})
</script>
<template>
  <div>
    <el-image
      class="w-[80px] h-[80px]"
      v-for="(item, index) in memsList"
      :key="index"
      :src="item"
      :preview-src-list="memsList"
      :initial-index="index"
      fit="cover"
      lazy
    />
  </div>
</template>
