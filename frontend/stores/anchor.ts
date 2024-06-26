import { useThrottleFn } from '@vueuse/core'
import { AnchorDTO } from '~/dtos/anchor'

export const useAnchorConfigStore = defineStore('anchor', () => {
  const nuxtApp = useNuxtApp()

  const domainData = useDomain()

  const domainConfig = ref<AnchorDTO>()

  const load = useThrottleFn(async function () {
    const result = await nuxtApp.$axios.get(`/api/anchor/${domainData.value.anchor}`)
    if (result.data.code === 1) {
      domainConfig.value = result.data.data
      return domainConfig.value
    }
    return undefined
  }, 1000)

  async function get() {
    if (!domainConfig.value) {
      return load()
    }
    return domainConfig.value
  }

  const pageName = computed(() => ({
    voice: `${domainConfig.value?.anchorTitle || '音频'}按钮`,
    emoticons: `${domainConfig.value?.anchorTitle || ''}表情包`,
    upload: `${domainConfig.value?.anchorTitle || '音频'}按钮 - 投稿`,
    changelog: `更新日志`,
  }))

  return {
    config: domainConfig,
    load,
    get,
    pageName
  }
})
