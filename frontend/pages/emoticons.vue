<script lang="ts" setup>
import { HTTPResponseData } from '~/dtos'
import { AnchorDTO } from '~/dtos/anchor'
import { getMemsUrl } from '~/util';

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
  page: 'emoticons'
})

useSeoMeta({
  title: () => anchorStore.pageName.emoticons,
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

const nuxtApp = useNuxtApp()

const domainData = useDomain()

const { data: emoticonDatas } = await useAsyncData(async () => {
  return (
    await nuxtApp.$axios.get<HTTPResponseData<AnchorDTO>>(
      `/api/anchor/${domainData.value.anchor}/emoticons`
    )
  ).data.data
})

</script>
<template>
  <el-main>
    <el-card v-for="item in emoticonDatas?.emoticonTags" :key="item.id" class="w-full mb-[16px]">
      <template #header>
        <div class="card-header">
          <span>{{ item.title }}</span>
        </div>
      </template>
      <el-image
        class="w-[80px] h-[80px]"
        v-for="(item2, index) in item.emoticons"
        :key="item2.id"
        :src="getMemsUrl(item2.source!)"
        :preview-src-list="item.emoticons?.map((item) => getMemsUrl(item.source!))"
        :initial-index="index"
        fit="cover"
        lazy
      />
    </el-card>
  </el-main>
</template>
