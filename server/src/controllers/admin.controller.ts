import { RoleMatcher, UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData, PageDTO, PageRequestDTO } from '@/dtos'
import { UpdateFileRequestDTO } from '@/dtos/admin'
import { UserModelDTO } from '@/dtos/user'
import User from '@/models/user.model'
import AdminServices from '@/services/admin.services'
import { RoleMatcherFn } from '@/utils/role_match'
import { Body, Get, JsonController, Put, QueryParams } from 'routing-controllers'
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
  async fileUpload(
    @Body() body: UpdateFileRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn,
    @UserInject() user: User
  ) {
    await this.adminServices.updateFile(body, roleMatcher, user)
    return HTTPResponseData.success(true)
  }

  @Get('/users')
  async getUsers(@RoleMatcher() roleMatcher: RoleMatcherFn, @QueryParams() query: PageRequestDTO) {
    roleMatcher('/user/list')
    const data = await this.adminServices.getAllUserWithPage(query, roleMatcher)
    return HTTPResponseData.success(
      new PageDTO(
        data[1],
        data[0].map((user) => new UserModelDTO(user))
      )
    )
  }
}

export default AdminController
