import { RoleMatcher, UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData } from '@/dtos'
import { UpdateFileRequestDTO } from '@/dtos/admin'
import User from '@/models/user.model'
import AdminServices from '@/services/admin.services'
import { RoleMatcherFn } from '@/utils/role_match'
import { Body, Get, JsonController, Put } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController('/admin')
class AdminController {
  @Inject()
  private declare adminServices: AdminServices

  @Get('/anchor')
  async getAnchorWithRole(@UserInject() _user: User, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    return HTTPResponseData.success(await this.adminServices.getAnchorWithRole(roleMatcher))
  }

  @Put('/upload')
  async fileUpload(@Body() body: UpdateFileRequestDTO, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    await this.adminServices.updateFile(body, roleMatcher)
  }
}

export default AdminController
