import UserServices from '@/services/user.services'
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { Inject } from 'typedi'

@Middleware({ type: 'before', priority: 100 })
export class OuthingHandle implements ExpressMiddlewareInterface {
  @Inject()
  private declare userService: UserServices

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async use(request: any, response: any, next: (err?: any) => any) {
    const jwt = request.cookies?.jwt
    if (jwt) {
      const user = await this.userService.loginInfo(jwt)
      if (user) {
        request.user = user
      }
    }
    next()
  }
}
