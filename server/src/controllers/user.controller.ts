import { Body, Get, JsonController, Param, Post, Put, QueryParams, Res } from 'routing-controllers'
import {
  ChangePasswordRequestDTO,
  SendSmsRequestDTO,
  SmsLoginRequestDTO,
  UserEditRequestDTO,
  UserLoginRequest,
  UserModelDTO,
  UserWithJWTDTO
} from '../dtos/user'
import { Inject } from 'typedi'
import UserServices from '../services/user.services'
import { HTTPResponseData } from '../dtos'
import { NotFoundError, WrongCaptachError, WrongUserOrPasswordError } from '../errors'
import { Response } from 'express'
import { RoleMatcher, UserInject } from '@/decorators/user.decorator'
import User from '@/models/user.model'
import SMSService from '@/services/sms.services'
import { RoleMatcherFn } from '@/utils/role_match'
import { envIsTrue } from '@/utils/env'

@JsonController('/user')
class UserController {
  @Inject()
  private declare userService: UserServices
  @Inject()
  private declare smsService: SMSService

  @Post('/login')
  async login(@Body() login: UserLoginRequest, @Res() response: Response) {
    const data = await (envIsTrue('USE_CAPCHA')
      ? this.userService.loginByPasswordWithCaptcha(login)
      : this.userService.loginByPassword(login))
    if (!data?.verifyResult) {
      throw WrongCaptachError()
    }
    if (!data?.user) {
      throw WrongUserOrPasswordError()
    }
    response.cookie('jwt', data.token, { path: process.env.BASE_DOMAIN || '/', httpOnly: true })
    return HTTPResponseData.success(new UserWithJWTDTO(data.token, data.user))
  }

  @Post('/login/phone')
  async loginByPhone(@Body() login: SmsLoginRequestDTO, @Res() response: Response) {
    const data = await this.userService.loginByPhone(login)
    response.cookie('jwt', data.token, { path: process.env.BASE_DOMAIN || '/', httpOnly: true })
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

  @Get('/roletest')
  async role(@Param('role') role: string, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    return HTTPResponseData.success(roleMatcher(role))
  }

  @Post('/:id/profile')
  async editUserProfile(
    @Param('id') id: number,
    @Body() body: UserEditRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    roleMatcher('/admin/user/edit')
    await this.userService.editUserProfilesByAdmin(id, body)
    return HTTPResponseData.success(1)
  }

  @Post('/:id/password')
  async editUserPassword(
    @Param('id') id: number,
    @Body() body: ChangePasswordRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    roleMatcher('/admin/user/edit')
    const result = await this.userService.changePasswordById(id, body.newPassword)
    if (result.affected) return HTTPResponseData.success(1)
    throw NotFoundError()
  }
}

export default UserController
