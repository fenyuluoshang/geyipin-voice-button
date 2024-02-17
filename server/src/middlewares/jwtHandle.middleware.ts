import UserServices from '@/services/user.services'
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'
import { Request, Response } from 'express'
import { Inject } from 'typedi'
import { createRoleMatch } from '@/utils/role_match'

@Middleware({ type: 'before', priority: 100 })
export class OuthingHandle implements ExpressMiddlewareInterface {
  @Inject()
  private declare userService: UserServices

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async use(request: Request, response: Response, next: (err?: any) => any) {
    const jwt = request.cookies?.jwt || request.headers?.jwt
    if (jwt) {
      const user = await this.userService.getUserInfoWithRoleByJwt(jwt)
      if (user) {
        request.user = user
      }
    }
    request.roleMatcher = createRoleMatch(request.user)
    next()
  }
}
