<script setup lang="ts">
definePageMeta({
  layout: 'with-head',
  title: '天才鸽按钮 - 投稿'
})

useSeoMeta({
  title: '天才鸽按钮 - 投稿'
})
</script>

<template>
  <client-only>
    <el-main>
      <upload-provide>
        <upload-voice></upload-voice>
      </upload-provide>
    </el-main>
  </client-only>
</template>
