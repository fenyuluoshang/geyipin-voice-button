<script lang="ts" setup>
import { useSearchStore } from '@/stores/search'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  path: string
}>()

const searchStore = useSearchStore()

const matched = computed(() => {
  if (!searchStore.search) {
    return true
  }
  return props.name.includes(searchStore.search)
})

async function playAudio() {
  const audio_url = `${import.meta.env.VITE_VOICE_PATH}${props.path}.MP3`
  const audio = new Audio(audio_url)
  audio.load()
  audio.play()
}
</script>

<template>
  <el-button :class="{ unmatched: !matched }" type="primary" @click="playAudio" round>
    <slot>
      {{ name }}
    </slot>
  </el-button>
</template>

<style lang="scss" scoped>
.unmatched{
  background-color: var(--el-button-disabled-bg-color);
  border-color: var(--el-button-disabled-border-color);
}
</style>
