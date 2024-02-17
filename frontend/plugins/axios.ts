import { isClient } from '@vueuse/core'
import axios from 'axios'

export default defineNuxtPlugin({
  setup: () => {
    const runtimeConfig = useRuntimeConfig()
    const axiosInstance = axios.create({
      baseURL: runtimeConfig.public.API_DOMAIN
    })
    axiosInstance.interceptors.request.use((val) => {
      if (!val.headers.get('jwt') && isClient) {
        val.headers.set('jwt', localStorage.getItem('jwt'))
      }
      return val
    })
    return {
      provide: {
        axios: axiosInstance
      }
    }
  }
})
