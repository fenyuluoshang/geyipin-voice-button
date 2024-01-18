import { Inject, Service } from 'typedi'
import { UserLoginRequest } from '../dtos/user'
import UserModel from '@/models/user.model'
import { createHash } from 'node:crypto'
import JWTServices from './jwt.services'

@Service()
class UserServices {
  @Inject()
  private declare jwtService: JWTServices

  async loginByPassword(login: UserLoginRequest) {
    const user = await UserModel.findOneBy({
      name: login.userName
    })

    if (
      user &&
      user.pass ===
        createHash('md5').update(`${login.password}:${user.salt}`).digest('hex').toString()
    ) {
      const token = await this.jwtService.makeJwt(user)

      return {
        user,
        token
      }
    }
    return null
  }

  async loginInfo(jwt: string) {
    const uid = await this.jwtService.readJWT(jwt)
    if (uid) {
      return await UserModel.findOneBy({ id: uid })
    }
  }
}

export default UserServices
