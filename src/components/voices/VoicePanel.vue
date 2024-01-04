<script lang="ts" setup>
import { computed, inject } from 'vue'
import { CONFIG_KEY } from '@/types/provide_keys'
import type { Voice } from '@/types/index'
import VoiceGroup from './VoiceGroup.vue';

const config = inject(CONFIG_KEY)

const voiceGroup = computed(() => {
  const groups: Record<
    string,
    {
      name: string
      list: Voice[]
    }
  > = {}

  config?.voices.forEach((item: Voice) => {
    if (!groups[item.group_name]) {
      groups[item.group_name] = {
        name: item.group_name,
        list: []
      }
    }

    groups[item.group_name].list.push(item)
  })

  return Object.values(groups)
})
</script>

<template>
  <div>
    <voice-group
      v-for="item in voiceGroup"
      :key="item.name"
      :name="item.name"
      :list="item.list"
    />
  </div>
</template>
