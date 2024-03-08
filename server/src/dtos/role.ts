import { IsIn, IsInt } from 'class-validator'

export class SetRoleRequest {
  @IsIn(['user', 'group'])
  declare target: 'user' | 'group'

  @IsInt()
  declare targetId: number

  declare roles: string[]
}

export class RemoveRoleRequest {
  @IsInt()
  declare roleId: number
}
