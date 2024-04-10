<script setup lang="ts">
const anchorStore = useAnchorConfigStore()
await useAsyncData('anchorConfigStore', async () => {
  return await anchorStore.get()
})

definePageMeta({
  layout: 'with-head',
  page: 'upload'
})

useSeoMeta({
  title: () => anchorStore.pageName.upload
})
</script>

<template>
  <!-- <client-only> -->
  <el-main>
    <upload-provide>
      <upload-content></upload-content>
    </upload-provide>
  </el-main>
  <!-- </client-only> -->
</template>
