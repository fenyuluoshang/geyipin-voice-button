import { IsString, Length, Matches, ValidateIf } from 'class-validator'
import User from '../models/user.model'
import { envIsTrue } from '@/utils/env'
import { union } from 'lodash'
import UserGroup from '@/models/user-group.model'
import Role from '@/models/role.model'

export class UserLoginRequest {
  @IsString()
  declare userName: string

  @IsString()
  declare password: string

  @ValidateIf(() => envIsTrue('USE_CAPCHA'))
  @IsString()
  declare captchaVerifyParam: string
}

export class RoleDTO {
  roleStr: string
  id: number

  user?: UserModelDTO
  group?: UserGroupDTO

  constructor(role: Role) {
    this.roleStr = role.roleStr
    this.id = role.id

    if (role.user) {
      this.user = new UserModelDTO(role.user)
    }
    if (role.group) {
      this.group = new UserGroupDTO(role.group)
    }
  }
}

export class UserGroupDTO {
  title?: string
  id: number

  users?: UserModelDTO[]
  roles?: RoleDTO[]

  constructor(userGroup: UserGroup) {
    this.title = userGroup.title
    this.id = userGroup.id
    this.users = userGroup.users?.map((user) => new UserModelDTO(user))
    this.roles = userGroup.roles?.map((role) => new RoleDTO(role))
  }
}

export class UserModelDTO {
  id: number

  nickName?: string

  name: string

  phone?: string

  mail?: string

  roleMerge?: string[]

  roles?: RoleDTO[]

  group?: UserGroupDTO

  constructor(user: User) {
    this.id = user.id
    this.nickName = user.nickName
    this.name = user.name
    this.phone = user.phone
    this.mail = user.mail

    this.roleMerge = union([
      ...(user.roles?.map((role) => role.roleStr) || []),
      ...(user.group?.roles.map((role) => role.roleStr) || [])
    ])

    this.roles = user.roles?.map((role) => new RoleDTO(role))
    if (user.group) {
      this.group = new UserGroupDTO(user.group)
    }
  }
}

export class UserWithJWTDTO extends UserModelDTO {
  jwt: string

  constructor(jwt: string, user: User) {
    super(user)
    this.jwt = jwt
  }
}

export class SendSmsRequestDTO {
  @IsString()
  @Length(11)
  declare phone: string
}

export class SmsLoginRequestDTO {
  @IsString()
  @Length(11)
  declare phone: string

  @IsString()
  @Matches(/\d{6}/)
  declare code: string
}
