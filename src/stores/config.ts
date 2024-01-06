import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import staticConfig from '../voice-mapping.json'
import type { Config } from '../types'

type mergedConfig = typeof staticConfig & Config

export const useConfigStore = defineStore('config', () => {
  const config = ref<Config>({
    low_voice_mode: 80,
    only_one_play_mode: false,
    keyboard_binding_mode: false
  })
  const configOutput = computed<mergedConfig>(() => ({
    ...staticConfig,
    ...config.value
  }))

  function increment(configData: Partial<Config>) {
    config.value = {
      ...config.value,
      ...configData
    }
  }
  return { config: configOutput, increment }
})
