import { HTTPResponseData } from '@/dtos'
import AliOssService from '@/services/ali-oss.services'
import { Get, JsonController } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController('/file')
class FileController {
  @Inject()
  private declare aliOssService: AliOssService

  @Get('/ali/sts')
  async aliSTS() {
    const sts = await this.aliOssService.ossCreateSTS()
    return HTTPResponseData.success(sts)
  }
}

export default FileController
