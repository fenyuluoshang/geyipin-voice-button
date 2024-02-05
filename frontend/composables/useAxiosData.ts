import axios, { AxiosRequestConfig } from "axios"

export async function useAxiosData<T = any>(config: AxiosRequestConfig) {
  const runtimeConfig = useRuntimeConfig()

  return useAsyncData(async ()=> {
    const data = await axios<T>({
      baseURL: runtimeConfig.public.API_DOMAIN,
      ...config
    })
    return data
  })
}
