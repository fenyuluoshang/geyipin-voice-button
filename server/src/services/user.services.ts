import { Inject, Service } from 'typedi'
import {
  CreateUserRequestDTO,
  SmsLoginRequestDTO,
  UserEditRequestDTO,
  UserLoginRequest
} from '../dtos/user'
import UserModel from '@/models/user.model'
import { createHash } from 'node:crypto'
import JWTServices from './jwt.services'
import { DataSource, MoreThan } from 'typeorm'
import { v4 as UUID } from 'uuid'
import PhoneEncode from '@/models/phone-encode.model'
import { EncodeVerifyFailed } from '@/errors/user'
import CaptchaService from './captcha.services'
import { NotFoundError } from '@/errors'

@Service()
class UserServices {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource
  @Inject()
  private declare jwtService: JWTServices
  @Inject()
  private declare captchaService: CaptchaService

  async loginByPasswordWithCaptcha(login: UserLoginRequest) {
    const verifyResult = await this.captchaService.aliCapchaVerify(login.captchaVerifyParam)
    if (verifyResult) {
      const user = await this.loginByPassword(login)
      if (user) {
        return {
          verifyResult,
          user: user.user,
          token: user.token
        }
      }
      return {
        verifyResult,
        user: null,
        token: null
      }
    }
    return {
      verifyResult,
      user: null,
      token: null
    }
  }

  async loginByPassword(login: UserLoginRequest) {
    const user = await UserModel.findOne({
      where: [
        {
          name: login.userName
        },
        {
          phone: login.userName
        },
        {
          mail: login.userName
        }
      ]
    })

    if (
      user &&
      user.pass ===
        createHash('md5').update(`${login.password}:${user.salt}`).digest('hex').toString()
    ) {
      const token = await this.jwtService.makeJwt(user)

      return {
        user,
        token,
        verifyResult: true
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

  private async changePassword(id: number, password: string) {
    const salt = Math.floor(1000 + Math.random() * 9000).toString()
    const Md5Password = createHash('md5').update(`${password}:${salt}`).digest('hex').toString()
    return UserModel.update(
      {
        id
      },
      {
        pass: Md5Password,
        salt
      }
    )
  }

  async changePasswordById(id: number | string, password: string) {
    const user = await UserModel.findOneBy({ id: Number(id) })
    if (!user) {
      throw NotFoundError()
    }
    return this.changePassword(user.id, password)
  }

  async changePasswordByLoginUser(user: UserModel, password: string) {
    return this.changePassword(user.id, password)
  }

  async editUserProfilesByAdmin(id: number, body: UserEditRequestDTO) {
    const user = await UserModel.findOneBy({ id })
    if (!user) throw NotFoundError()
    if (body.email) user.mail = body.email
    if (body.phone) user.phone = body.phone
    if (body.nickName) user.nickName = body.nickName
    if (body.username) user.name = body.username
    return user.save()
  }

  async createUserByAdmin(body: CreateUserRequestDTO) {
    const user = new UserModel()
    user.name = body.username
    user.mail = body.email
    user.phone = body.phone
    user.nickName = body.nickName
    user.groupId = body.groupId

    const salt = Math.floor(1000 + Math.random() * 9000).toString()
    const Md5Password = createHash('md5')
      .update(`${body.password}:${salt}`)
      .digest('hex')
      .toString()
    user.pass = Md5Password

    return user.save()
  }
}

export default UserServices
