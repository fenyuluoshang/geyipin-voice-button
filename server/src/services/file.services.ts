import { FileConfigError } from '@/errors/file'
import { Inject, Service } from 'typedi'
import AliOssService from './ali-oss.services'
import { v4 as UUID } from 'uuid'

@Service()
class FileServices {
  @Inject()
  private declare aliOssService: AliOssService

  async getFile(path: string) {
    if (process.env.FILE_SAVE_MODE === 'ali') {
      return this.aliOssService.getOssFileStream(path)
    }
    throw FileConfigError()
  }

  async makeSTS(type: string) {
    const fileUUID = `${process.env.ALI_OSS_PREFIX}${type}/${UUID().replace('-', '')}`
    const sts = await this.aliOssService.ossCreateSTS(fileUUID)
    return {
      ...sts,
      path: fileUUID
    }
  }

  async setFilePublicRead(path: string) {
    if (process.env.FILE_SAVE_MODE === 'ali') {
      return this.aliOssService.ossSetPublicRead(path)
    }
  }
}

export default FileServices
