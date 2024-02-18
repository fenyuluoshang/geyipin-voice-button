import { Service } from 'typedi'
import oss from 'ali-oss'
import { NotFoundError } from '@/errors'
import { NotAllowSTS } from '@/errors/file'
import { envIsTrue } from '@/utils/env'

class OSSConfigError extends Error {
  constructor(message: string) {
    super(`[ALI OSS Config Error] detail:\n${message}`)
  }
}

@Service()
class AliOssService {
  private client_cache: oss | undefined
  private ali_oss_domain_cache: string | undefined

  private crateOssClient() {
    if (
      !process.env.ALI_ACCESS_KEY_ID ||
      !process.env.ALI_ACCESS_KEY_SECRET ||
      !process.env.ALI_OSS_ENDPOINT ||
      !process.env.ALI_OSS_BUCKET
    ) {
      throw new OSSConfigError('Create OSS Client Error')
    }
    const client = new oss({
      endpoint: process.env.ALI_OSS_ENDPOINT,
      accessKeyId: process.env.ALI_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET,
      bucket: process.env.ALI_OSS_BUCKET
    })
    this.client_cache = client
    setTimeout(
      () => {
        this.client_cache = undefined
      },
      10 * 60 * 1000
    )
  }

  private getOssClient() {
    if (!this.client_cache) {
      this.crateOssClient()
    }
    return this.client_cache as oss
  }

  async ossCreateSTS(allowPutFile = '*') {
    if (!envIsTrue('STS_UPLOAD')) {
      throw NotAllowSTS()
    }
    if (
      !process.env.ALI_ACCESS_KEY_ID ||
      !process.env.ALI_ACCESS_KEY_SECRET ||
      !process.env.STS_USER_ROLE_ARN ||
      !process.env.ALI_OSS_BUCKET
    ) {
      throw new OSSConfigError('Create STS Error')
    }

    const sts = new oss.STS({
      accessKeyId: process.env.ALI_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET
    })

    let path = /^\//.test(allowPutFile) ? allowPutFile : `/${allowPutFile}`
    if (!/\*/.test(path)) {
      path += '.*'
    }
    const key = await sts.assumeRole(
      process.env.STS_USER_ROLE_ARN,
      JSON.stringify({
        Version: '1',
        Statement: [
          {
            Effect: 'Allow',
            Action: ['oss:PutObject'],
            Resource: [`acs:oss:*:*:${process.env.ALI_OSS_BUCKET}${path}`]
          }
        ]
      }),
      // 15min
      900
    )
    return {
      ...key.credentials,
      bucket: process.env.ALI_OSS_BUCKET,
      endpoint: process.env.ALI_OSS_ENDPOINT
    }
  }

  async ossGetDomain() {
    const client = this.getOssClient()
    const demain =
      process.env.ALI_OSS_PUBLIC_DEMAIN ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (await client.getBucketInfo()).bucket.ExtranetEndpoint
    return demain as string
  }

  async ossGetDomainWithCache() {
    if (!this.ali_oss_domain_cache) {
      const domain = await this.ossGetDomain()
      this.ali_oss_domain_cache = domain
    }
    setTimeout(
      () => {
        this.ali_oss_domain_cache = undefined
      },
      10 * 60 * 1000
    )
    return this.ali_oss_domain_cache as string
  }

  async ossExitFile(filePath: string) {
    const client = this.getOssClient()
    try {
      await client.head(filePath)
      return true
    } catch (error) {
      return false
    }
  }

  async getOssFileStream(filePath: string) {
    const client = this.getOssClient()
    try {
      return await client.getStream(filePath)
    } catch (e) {
      throw NotFoundError()
    }
  }

  async ossSetPublicRead(filePath: string) {
    const client = this.getOssClient()
    try {
      return await client.putACL(filePath, 'public-read')
    } catch (e) {
      throw NotFoundError()
    }
  }
}

export default AliOssService
