import { FileConfigError } from '@/errors/file'
import { Inject, Service } from 'typedi'
import AliOssService from './ali-oss.services'
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
}

export default FileServices
