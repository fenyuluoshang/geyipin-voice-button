const useUserStore = defineStore('user', () => {
  const nuxtApp = useNuxtApp()

  const jwt = ref(localStorage.getItem('jwt'))
  const userStatus = ref()
  const init = ref(false)
  const loading = ref(false)

  async function loadUserStatus() {
    if (init.value && loading.value) {
      return
    }
    init.value = true
    loading.value = true
    try {
      const result = await nuxtApp.$axios.get('/api/user/status', {
        headers: {
          jwt: jwt.value
        }
      })
      if (result.data.code === 1) {
        userStatus.value = result.data.data
      }
      loading.value = false
    } catch (_) {
      userStatus.value = undefined
      loading.value = false
    }
  }

  const pending = computed(() => !init.value || loading.value)

  async function setToken(jwt_result: string) {
    jwt.value = jwt_result
    localStorage.setItem('jwt', jwt_result)
    await loadUserStatus()
  }

  return {
    jwt,
    userStatus,
    pending,
    loadUserStatus,
    init,
    loading,
    setToken
  }
})

export default useUserStore
