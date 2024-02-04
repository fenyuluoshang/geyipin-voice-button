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
    const fileUUID = `${type}/${UUID().replace('-', '')}`
    const sts = this.aliOssService.ossCreateSTS(fileUUID)
    return {
      ...sts,
      path: fileUUID
    }
  }
}

export default FileServices
