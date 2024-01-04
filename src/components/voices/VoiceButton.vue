<script lang="ts" setup>
const props = defineProps<{
  path: string
}>()

async function playAudio() {
  const audio_url = (await import(`../../assets/voices/${props.path}.MP3?url`)).default as string
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
