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
  <!-- <client-only> -->
    <el-main>
      <upload-provide>
        <upload-content></upload-content>
      </upload-provide>
    </el-main>
  <!-- </client-only> -->
</template>
