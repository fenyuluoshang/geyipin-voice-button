import { Inject, Service } from 'typedi'
import { SmsLoginRequestDTO, UserLoginRequest } from '../dtos/user'
import UserModel from '@/models/user.model'
import { createHash } from 'node:crypto'
import JWTServices from './jwt.services'
import { DataSource, MoreThan } from 'typeorm'
import { v4 as UUID } from 'uuid'
import PhoneEncode from '@/models/phone-encode.model'
import { EncodeVerifyFailed } from '@/errors/user'

@Service()
class UserServices {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource
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

  async getUserInfoWithRoleByJwt(jwt: string) {
    const uid = await this.jwtService.readJWT(jwt)
    if (uid) {
      return await UserModel.findOne({
        where: { id: uid },
        relations: {
          group: {
            roles: true
          },
          roles: true
        }
      })
    }
  }

  async createUserByPhone(phone: string) {
    const user = new UserModel()
    user.name = `USER_${UUID()}`
    user.phone = phone
    // default guest group
    user.groupId = 2
    await user.save()
    return user
  }

  async loginByPhone(login: SmsLoginRequestDTO) {
    const code = await PhoneEncode.findOne({
      where: {
        phone: login.phone,
        code: login.code,
        expirTime: MoreThan(new Date()),
        hasUsed: false
      }
    })
    if (!code) {
      throw EncodeVerifyFailed()
    }
    code.hasUsed = true
    code.save()
    let user = await UserModel.findOne({
      where: {
        phone: login.phone
      }
    })
    if (!user) {
      user = await this.createUserByPhone(login.phone)
    }
    return {
      user,
      token: await this.jwtService.makeJwt(user)
    }
  }
}

export default UserServices
