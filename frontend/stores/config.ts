import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import staticConfig from '../voice-mapping.json'
import type { Config } from '../types'

type mergedConfig = Readonly<typeof staticConfig> & Config

export const useConfigStore = defineStore('config', () => {
  const config = ref<Config>({
    low_voice_mode: 80,
    only_one_play_mode: false,
    keyboard_binding_mode: false,
    in_setting: false,
    keyboard_binding_map: {}
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

  function setKey(key: string, index?: number) {
    if (index === undefined) {
      config.value.keyboard_binding_map[key] = -1
    } else {
      const voice = configOutput.value.voices[index]
      config.value.keyboard_binding_map[key] = {
        index,
        voice
      }
    }
    const data = JSON.stringify(config.value.keyboard_binding_map)
    localStorage.setItem('keyboard_binding_config', data)
  }

  function loadStore() {
    const data = localStorage.getItem('keyboard_binding_config')
    if (!data) {
      return
    }
    config.value.keyboard_binding_map = JSON.parse(data)
  }

  return { config: configOutput, increment, setKey, loadStore }
})
