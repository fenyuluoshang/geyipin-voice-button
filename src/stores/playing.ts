import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import { getAudioUrl } from '@/util/index'

export const usePlayingStore = defineStore('playing', () => {
  const configStore = useConfigStore()
  const playingList = ref<HTMLAudioElement[]>([])

  function play(path: string) {
    const audio = new Audio(path)
    if (configStore.config.only_one_play_mode) {
      playingList.value.forEach((item) => {
        item.pause()
      })
    }
    audio.load()
    playingList.value.push(audio)
    audio.volume = configStore.config.low_voice_mode / 100
    audio.addEventListener('pause', () => {
      const index = playingList.value.findIndex((v) => v === audio)
      playingList.value.splice(index, 1)
    })
    audio.play()
  }

  function onKeyDown(ev: KeyboardEvent) {
    const key = ev.key
    const audio = configStore.config.keyboard_binding_map[key]
    if (audio && audio !== -1) {
      play(getAudioUrl(audio.voice.file))
    }
  }

  return { playingList, play, onKeyDown }
})
