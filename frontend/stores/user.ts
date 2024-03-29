import { UserModelDTO } from "~/dtos/user"

const useUserStore = defineStore('user', () => {
  const nuxtApp = useNuxtApp()

  const userStatus = ref<UserModelDTO>()
  const init = ref(false)
  const loading = ref(false)

  async function loadUserStatus() {
    if (init.value && loading.value) {
      return
    }
    init.value = true
    loading.value = true
    try {
      const result = await nuxtApp.$axios.get('/api/user/status')
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
    localStorage.setItem('jwt', jwt_result)
    await loadUserStatus()
  }

  return {
    userStatus,
    pending,
    loadUserStatus,
    init,
    loading,
    setToken
  }
})

export default useUserStore
