import { AnchorDTO } from "~/dtos/anchor"

export const useAnchorConfigStore = defineStore('anchor', () => {
  const nuxtApp = useNuxtApp()

  const domainData = useDomain()

  const domainConfig = ref<AnchorDTO>()

  async function load() {
    const result = await nuxtApp.$axios.get(`/api/anchor/${domainData.value.anchor}`)
    if (result.data.code === 1) {
      domainConfig.value = result.data.data
      return domainConfig.value
    }
    return undefined
  }

  async function get() {
    if (!domainConfig.value) {
      return load()
    }
    return domainConfig.value
  }

  return {
    config: domainConfig,
    load,
    get
  }
})
