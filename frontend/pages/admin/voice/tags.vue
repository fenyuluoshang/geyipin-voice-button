<script setup lang="ts">
const activeAnchor = ref<number>()
</script>
<template>
  <div class="h-full">
    <admin-target-anchor-selector v-model:active-anchor="activeAnchor" type="/voice/tags" />
    <el-card class="mt-[12px]"></el-card>
  </div>
</template>
