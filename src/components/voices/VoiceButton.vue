<script lang="ts" setup>
const props = defineProps<{
  path: string
}>()

async function playAudio() {
  console.log(import.meta)
  const audio_url = `${import.meta.env.VITE_VOICE_PATH}${props.path}.MP3`
  const audio = new Audio(audio_url)
  audio.load()
  audio.play()
}
</script>

<template>
  <el-button type="primary" @click="playAudio" round>
    <slot />
  </el-button>
</template>
