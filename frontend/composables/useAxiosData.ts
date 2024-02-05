import { isClient } from '@vueuse/core'
import axios, { AxiosRequestConfig } from 'axios'

export async function useAxiosData<T = any>(config: AxiosRequestConfig) {
  const runtimeConfig = useRuntimeConfig()

  return useAsyncData(async () => {
    const jwt = isClient ? localStorage.getItem('jwt') : undefined
    const configMerge: AxiosRequestConfig = {
      baseURL: runtimeConfig.public.API_DOMAIN,
      ...config
    }
    if (!configMerge.headers) {
      configMerge.headers = {}
    }
    configMerge.headers.jwt = jwt
    const data = await axios<T>(configMerge)
    return data
  })
}
