<script lang="ts" setup>
import { getMemsUrl } from '@/util'

defineOptions({
  name: 'VoiceButtonPage',
  title: ''
})

definePageMeta({
  layout: 'with-head',
  title: '天才鸽表情'
})

useSeoMeta({
  title: '天才鸽表情',
  keywords: '鸽一品,天才鸽,虚拟主播,语音按钮',
  description:
    '本站是由粉丝收集整理的主播直播时的语音合集，虚拟主播鸽一品是一名活跃于Bilibili上的UP主，个人势虚拟UP主'
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
