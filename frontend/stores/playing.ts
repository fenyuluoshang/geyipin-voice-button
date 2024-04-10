import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useConfigStore } from './config'
import { changeAudioVolumeFixed, getAudioUrl } from '@/util/index'
import { PlayRequestPlayed, VoiceDTO } from '~/dtos/voice'
import { useThrottleFn } from '@vueuse/core'

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

  const playedUploadList = ref<number[]>([])
  const nuxtApp = useNuxtApp()

  const uploadPlayedRequest = useThrottleFn(
    async () => {
      if (!playedUploadList.value.length) {
        return
      }
      const map: Map<number, number> = new Map()
      playedUploadList.value.forEach((item) => {
        if (map.has(item)) map.set(item, map.get(item)! + 1)
        else {
          map.set(item, 1)
        }
      })

      const body: PlayRequestPlayed[] = []
      Array.from(map.keys()).forEach((item) => {
        body.push({
          voiceId: item,
          time: map.get(item)!
        })
      })

      await nuxtApp.$axios.post(`/api/voice/play`, {
        played: body
      })

      playedUploadList.value = []
    },
    1000,
    true
  )

  function uploadPlayed(id: number) {
    playedUploadList.value.push(id)
    uploadPlayedRequest()
  }

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
    uploadPlayed(voice.id)
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
