import axios from 'axios'

export default defineNuxtPlugin({
  setup: () => {
    const runtimeConfig = useRuntimeConfig()
    return {
      provide: {
        axios: axios.create({
          baseURL: runtimeConfig.public.API_DOMAIN
        })
      }
    }
  }
})
