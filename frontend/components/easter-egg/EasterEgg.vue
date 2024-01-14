<script lang="ts" setup>
import { usePlayingStore } from '@/stores/playing'
import { ref, watch } from 'vue'

const playingStore = usePlayingStore()

const opened = ref(false)
const open = ref(false)
watch(playingStore.playedList, (v) => {
  if (!opened.value && v.filter((item) => item.group_name === '博美').length > 20) {
    open.value = true
    opened.value = true
    playingStore.play({
      group_name: '',
      title: '',
      file: '哼，你们说我是狗，你们就是小狗'
    })
  }
})
</script>

<template>
  <client-only>
    <el-dialog v-model="open" width="80%" center class="max-w-[600px]">
      <div class="font-[MuYao] text-lg text-center">主包才不是博美，杀了你，可恶喵！</div>
      <div class="flex justify-center"><img src="@/assets/easter-egg-1.png" /></div>
    </el-dialog>
  </client-only>
</template>
