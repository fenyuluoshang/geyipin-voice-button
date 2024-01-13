<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'
import { useSearchStore } from '@/stores/search'
import { usePlayingStore } from '@/stores/playing'
import { computed } from 'vue'
import type { Voice } from '@/types'
const props = defineProps<{
  name: string
  voice: Voice
}>()

const searchStore = useSearchStore()
const configData = useConfigStore()
const playingStore = usePlayingStore()

const matched = computed(() => {
  if (!searchStore.search) {
    return true
  }
  return props.name.includes(searchStore.search)
})

async function playAudio() {
  playingStore.play(props.voice)
}
</script>

<template>
  <el-button
    :color="configData.config.btn_color"
    :class="{ unmatched: !matched }"
    @click="playAudio"
    round
  >
    <slot>
      {{ name }}
    </slot>
  </el-button>
</template>

<style lang="scss" scoped>
.unmatched {
  background-color: var(--el-button-disabled-bg-color);
  border-color: var(--el-button-disabled-border-color);
}
</style>
