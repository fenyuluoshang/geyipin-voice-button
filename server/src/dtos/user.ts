import { IsString, Length, Matches, ValidateIf } from 'class-validator'
import User from '../models/user.model'
import { envIsTrue } from '@/utils/env'

export class UserLoginRequest {
  @IsString()
  declare userName: string

  @IsString()
  declare password: string

  @ValidateIf(() => envIsTrue('USE_CAPCHA'))
  @IsString()
  declare captchaVerifyParam: string
}

export class UserModelDTO {
  id: number

  nickName?: string

  name: string

  phone?: string

  mail?: string

  constructor(user: User) {
    this.id = user.id
    this.nickName = user.nickName
    this.name = user.name
    this.phone = user.phone
    this.mail = user.mail
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
