import { Config as AliShitOpenApiConfig } from '@alicloud/openapi-client'

// the way to create ali config is shit code, I will try to fix it at here
type FixConfigType = {
  [T in keyof AliShitOpenApiConfig]?: AliShitOpenApiConfig[T]
}

export function getAliCloudOpenApiConfig(configMap?: FixConfigType) {
  const config = new AliShitOpenApiConfig({
    accessKeyId: process.env.ALI_ACCESS_KEY_ID,
    accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET
  })
  if (configMap) {
    Object.keys(configMap).forEach((item) => {
      config[item] = configMap[item]
    })
  }
  return config
}
