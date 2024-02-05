import User from '@/models/user.model'
import UserServices from '@/services/user.services'
import { RoleMatcherFn } from '@/utils/role_match'
import { createParamDecorator } from 'routing-controllers'
import Container from 'typedi'

export function UserInject(required = false) {
  const userService = Container.get(UserServices)
  return createParamDecorator({
    required,
    value: async (action) => {
      const jwt = action.request.cookies?.jwt || action.request.headers?.jwt
      return (action.request.user as User) || (jwt && (await userService.loginInfo(jwt)))
    }
  })
}

export function Authorize() {
  return createParamDecorator({
    required: true,
    value: (action) => {
      const user = action.request.user as User
      return user
    }
  })
}

export function RoleMatcher() {
  return createParamDecorator({
    required: false,
    value: (action) => {
      const roleMatcher = action.request.roleMatcher as RoleMatcherFn
      return roleMatcher
    }
  })
}
