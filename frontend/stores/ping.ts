const usePingStore = defineStore('ping', () => {
  const nuxtApp = useNuxtApp()
  const config = ref<{
    ff_test: true
    useSTS: boolean
    mode: string
    useCapcha: boolean
    sourceDomain: string
  }>()
  async function loadPing() {
    const result = await nuxtApp.$axios.get('/api/ping')
    config.value = result.data.data
  }

  return {
    loadPing,
    config
  }
})

export default usePingStore
