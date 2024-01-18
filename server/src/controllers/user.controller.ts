import { Body, CookieParam, Get, JsonController, Post, Res } from 'routing-controllers'
import { UserLoginRequest, UserModelDTO } from '../dtos/user'
import { Inject } from 'typedi'
import UserServices from '../services/user.services'
import { HTTPResponseData } from '../dtos'
import { NotFoundError, WrongUserOrPasswordError } from '../errors'
import { Response } from 'express'
@JsonController('/user')
class UserController {
  @Inject()
  private declare userService: UserServices

  @Post('/login')
  async login(@Body() login: UserLoginRequest, @Res() response: Response) {
    const data = await this.userService.loginByPassword(login)
    if (!data?.user) {
      throw WrongUserOrPasswordError()
    }
    response.cookie('jwt', data.token)
    return HTTPResponseData.success(new UserModelDTO(data.user))
  }

  @Get('/status')
  async status(@CookieParam('jwt') jwt: string) {
    const user = await this.userService.loginInfo(jwt)
    if (!user) {
      throw NotFoundError()
    }
    return HTTPResponseData.success(new UserModelDTO(user))
  }
}

export default UserController
