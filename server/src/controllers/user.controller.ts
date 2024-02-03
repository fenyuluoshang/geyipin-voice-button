import { Body, Get, JsonController, Post, Put, QueryParams, Res } from 'routing-controllers'
import {
  SendSmsRequestDTO,
  SmsLoginRequestDTO,
  UserLoginRequest,
  UserModelDTO,
  UserWithJWTDTO
} from '../dtos/user'
import { Inject } from 'typedi'
import UserServices from '../services/user.services'
import { HTTPResponseData } from '../dtos'
import { NotFoundError, WrongUserOrPasswordError } from '../errors'
import { Response } from 'express'
import { UserInject } from '@/decorators/user.decorator'
import User from '@/models/user.model'
import SMSService from '@/services/sms.services'

@JsonController('/user')
class UserController {
  @Inject()
  private declare userService: UserServices
  @Inject()
  private declare smsService: SMSService

  @Post('/login')
  async login(@Body() login: UserLoginRequest, @Res() response: Response) {
    const data = await this.userService.loginByPassword(login)
    if (!data?.user) {
      throw WrongUserOrPasswordError()
    }
    response.cookie('jwt', data.token)
    return HTTPResponseData.success(new UserWithJWTDTO(data.token, data.user))
  }

  @Post('/login/phone')
  async loginByPhone(@Body() login: SmsLoginRequestDTO, @Res() response: Response) {
    const data = await this.userService.loginByPhone(login)
    response.cookie('jwt', data.token)
    return HTTPResponseData.success(new UserWithJWTDTO(data.token, data.user))
  }

  @Put('/send_sms')
  async requestPhoneEncode(@QueryParams() query: SendSmsRequestDTO) {
    this.smsService.sendSMSVerifyCodeWithPhone(query.phone)
    return HTTPResponseData.success(true)
  }

  @Get('/status')
  async status(@UserInject() user: User) {
    if (!user) {
      throw NotFoundError()
    }
    return HTTPResponseData.success(new UserModelDTO(user))
  }
}

export default UserController
