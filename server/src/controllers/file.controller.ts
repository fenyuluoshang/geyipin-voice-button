import { RoleMatcher, UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData } from '@/dtos'
import User from '@/models/user.model'
import AliOssService from '@/services/ali-oss.services'
import FileServices from '@/services/file.services'
import { RoleMatcherFn } from '@/utils/role_match'
import { Controller, Get, QueryParam } from 'routing-controllers'
import { Inject } from 'typedi'

@Controller('/file')
class FileController {
  @Inject()
  private declare aliOssService: AliOssService
  @Inject()
  private declare fileService: FileServices

  @Get('/upload_config')
  async getUploadConfig() {
    return HTTPResponseData.success({
      useSTS: process.env.STS_UPLOAD,
      mode: process.env.FILE_SAVE_MODE
    })
  }

  @Get('/admin_view')
  async getFileWithAdmin(
    @QueryParam('path') path: string,
    @RoleMatcher() roleMatcher: RoleMatcherFn,
    @UserInject(true) _user: User
  ) {
    roleMatcher('/admin/file_view')
    return this.fileService.getFile(path)
  }
}

export default FileController
