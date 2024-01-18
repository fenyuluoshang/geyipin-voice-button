import { Body, JsonController, Post, Session } from 'routing-controllers'
import { UserLoginRequest, UserModelDTO } from '../dtos/user'
import { Inject } from 'typedi'
import UserServices from '../services/user.services'
import { HTTPResponseData } from '../dtos'
import { ExpressSession } from '../types'
import { WrongUserOrPasswordError } from '../errors'
@JsonController('/user')
class UserController {
  @Inject()
  declare userService: UserServices

  @Post('/login')
  async login(@Session() session: ExpressSession, @Body() login: UserLoginRequest) {
    const user = await this.userService.loginByPassword(login)
    if (!user) {
      throw WrongUserOrPasswordError()
    }
    session.userId = user.id
    return HTTPResponseData.success(new UserModelDTO(user))
  }
}

export default UserController
