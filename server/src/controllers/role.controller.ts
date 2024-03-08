import { RoleMatcher } from '@/decorators/user.decorator'
import { HTTPResponseData } from '@/dtos'
import { RemoveRoleRequest, SetRoleRequest } from '@/dtos/role'
import RoleServices from '@/services/role.services'
import { RoleMatcherFn } from '@/utils/role_match'
import { Body, Delete, JsonController, Params, Post } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController('/role')
class RoleController {
  @Inject()
  private declare roleService: RoleServices

  @Post('/set')
  async set(@Body() data: SetRoleRequest, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    roleMatcher('/user/role')
    if (data.target === 'group') {
      await this.roleService.editGroupRole(data.targetId, data.roles)
    } else if (data.target === 'user') {
      await this.roleService.editUserRole(data.targetId, data.roles)
    }
    return HTTPResponseData.success('ok')
  }

  @Delete('/remove/:id')
  async remove(@Params() data: RemoveRoleRequest, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    roleMatcher('/user/role')
    await this.roleService.removeRole(data.roleId)
    return HTTPResponseData.success('ok')
  }
}

export default RoleController
