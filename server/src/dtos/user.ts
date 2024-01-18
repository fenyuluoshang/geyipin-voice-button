import User from '../models/user.model'

export class UserLoginRequest {
  declare userName: string

  declare password: string
}

export class UserModelDTO {
  id: number

  nickName: string

  name: string

  phone: string

  mail: string

  constructor(user: User) {
    this.id = user.id
    this.nickName = user.nickName
    this.name = user.name
    this.phone = user.phone
    this.mail = user.mail
  }
}
