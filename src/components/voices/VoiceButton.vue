<script lang="ts" setup>
import { useConfigStore } from '@/stores/config'
import { useSearchStore } from '@/stores/search'
import { usePlayingStore } from '@/stores/playing'
import { getAudioUrl } from '@/util/index'
import { computed } from 'vue'
const props = defineProps<{
  name: string
  path: string
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
  const audio_url = getAudioUrl(props.path)
  playingStore.play(audio_url)
}
</script>

<template>
  <el-button
    :color="configData.config.btn_color"
    :class="{ unmatched: !matched }"
    type="primary"
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
