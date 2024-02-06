export interface VoiceTagDTO {
  title: string
  anchor?: AnchorDTO
  voices?: VoiceDTO[]
}

export interface VoiceDTO {
  title: string
  source?: string
  anchor?: AnchorDTO
  tags?: VoiceTagDTO[]
  playTime: bigint
}

export interface AnchorDTO {
  id: number
  anchorName?: string
  anchorTitle?: string
  pathName?: string
  biliId?: number
  biliveId?: number
  lastVideoBV?: string
  primaryColor?: string
  secondColor?: string
  primaryColorDark?: string
  secondColorDark?: string
  btnColor?: string
  createAt?: Date
  updateAt?: Date
  voices?: VoiceDTO[]
}

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
