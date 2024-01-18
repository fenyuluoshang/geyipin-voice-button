import { Inject, Service } from 'typedi'
import { UserLoginRequest } from '../dtos/user'
import { DataSource } from 'typeorm'
import UserModel from '../models/user.model'
import { MD5 } from 'crypto-js'

@Service()
class UserServices {
  @Inject()
  declare appDataSource: DataSource

  async loginByPassword(login: UserLoginRequest) {
    const user = await UserModel.findOneBy({
      name: login.userName
    })

    if (user && user?.pass === MD5(`${login.password}:${user?.salt}`).toString()) {
      return user
    }
    return null
  }
}

export default UserServices
