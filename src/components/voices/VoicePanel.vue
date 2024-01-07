<script lang="ts" setup>
import { computed } from 'vue'
import type { Voice } from '@/types/index'
import VoiceGroup from './VoiceGroup.vue';
import { useConfigStore } from '@/stores/config';

const config = useConfigStore()

const voiceGroup = computed(() => {
  const groups: Record<
    string,
    {
      name: string
      list: Voice[]
    }
  > = {}

  config.config.voices.forEach((item: Voice) => {
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
