<script lang="ts" setup>
import type { Voice } from '@/types/index'

defineProps<{
  name: string
  list: Voice[]
}>()
</script>

<template>
  <div class="mt-[32px]" :data-test-id="`voice-group-${name}`">
    <h2 class="text-white font-[MuYao] text-4xl select-none">{{ name }}</h2>
    <el-divider />
    <div class="leading-[54px] flex gap-[6px] flex-wrap">
      <voice-button
        v-for="item in list"
        :key="item.title"
        :path="item.file"
        :name="item.title"
        type="primary"
        round
      />
    </div>
  </div>
</template>
