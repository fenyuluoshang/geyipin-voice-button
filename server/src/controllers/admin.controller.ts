import { RoleMatcher, UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData, PageDTO, PageRequestDTO } from '@/dtos'
import { UpdateFileRequestDTO } from '@/dtos/admin'
import {
  CreateUserRequestDTO,
  EditRoleParamDTO,
  EditRoleRequestDTO,
  EditUserRequestDTO,
  UserModelDTO
} from '@/dtos/user'
import User from '@/models/user.model'
import AdminServices from '@/services/admin.services'
import GroupServices from '@/services/group.services'
import UserServices from '@/services/user.services'
import { RoleMatcherFn } from '@/utils/role_match'
import {
  Body,
  Get,
  JsonController,
  Param,
  Params,
  Post,
  Put,
  QueryParams
} from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController('/admin')
class AdminController {
  @Inject()
  private declare adminServices: AdminServices

  @Inject()
  private declare userService: UserServices

  @Inject()
  private declare groupService: GroupServices

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

  @Put('/user')
  async createUser(@Body() body: CreateUserRequestDTO, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    roleMatcher('/user/create')
    const result = await this.userService.createUserByAdmin(body)
    return HTTPResponseData.success(new UserModelDTO(result))
  }

  @Post('/user/:id')
  async editUser(
    @Body() body: EditUserRequestDTO,
    @Param('id') id: number,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    roleMatcher('/user/edit')
    return HTTPResponseData.success(await this.userService.editUserByAdmin(id, body))
  }

  @Post('/role/:type/:id')
  async editRole(
    @Body() body: EditRoleRequestDTO,
    @Params() params: EditRoleParamDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    roleMatcher(`/${params.type}/role/edit`)
    if (params.type === 'group') {
      await this.groupService.updateGroupRole(params.id, body.roles)
    } else {
      await this.userService.updateUserRole(params.id, body.roles)
    }
    return HTTPResponseData.success('ok')
  }
}

export default AdminController
