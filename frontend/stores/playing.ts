import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import { changeAudioVolumeFixed, getAudioUrl } from '@/util/index'
import { VoiceDTO } from '~/dtos/voice'

export const usePlayingStore = defineStore('playing', () => {
  const configStore = useConfigStore()
  const playingList = ref<HTMLAudioElement[]>([])
  const playedList = ref<VoiceDTO[]>([])

  watch(
    () => configStore.config.low_voice_mode,
    (val) => {
      playingList.value.forEach((item) => {
        changeAudioVolumeFixed(item, val / 100)
      })
    }
  )

  function play(voice: VoiceDTO) {
    const path = getAudioUrl(voice.source!)
    const audio = new Audio(path)
    audio.style.display = 'none'
    if (configStore.config.only_one_play_mode) {
      playingList.value.forEach((item) => {
        item.pause()
      })
    }
    audio.crossOrigin = 'anonymous'
    audio.load()
    playingList.value.push(audio)
    changeAudioVolumeFixed(audio, configStore.config.low_voice_mode / 100)
    audio.addEventListener('pause', () => {
      const index = playingList.value.findIndex((v) => v === audio)
      playingList.value.splice(index, 1)
      playedList.value.push(voice)
    })
    audio.play()
  }

  function onKeyDown(ev: KeyboardEvent) {
    const key = ev.key
    const audio = configStore.config.keyboard_binding_map[key]
    if (audio && audio !== -1) {
      play(audio.voice)
    }
  }

  return { playingList, playedList, play, onKeyDown }
})
