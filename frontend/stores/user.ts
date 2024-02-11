const useUserStore = defineStore('user', () => {
  const nuxtApp = useNuxtApp()
  const jwt = ref(localStorage.getItem('jwt'))

  const userStatus = ref()

  async function loadUserStatus() {
    userStatus.value = (
      await nuxtApp.$axios.get('/api/user/status', {
        headers: {
          jwt: jwt.value
        }
      })
    ).data
  }
  
  return {
    jwt,
    userStatus,
    loadUserStatus
  }
})

export default useUserStore
