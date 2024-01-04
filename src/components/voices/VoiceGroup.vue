<script lang="ts" setup>
import type { Voice } from '@/types/index'

defineProps<{
  name: string
  list: Voice[]
}>()
</script>

<template>
  <div class="mt-[32px] first:mt-0" :data-test-id="`voice-group-${name}`">
    <h2 class="text-white font-[MuYao] text-4xl select-none">{{ name }}</h2>
    <el-divider />
    <voice-button
      v-for="item in list"
      :key="item.group_name"
      :path="item.file"
      type="primary"
      round
    >
      {{ item.title }}
    </voice-button>
  </div>
</template>
