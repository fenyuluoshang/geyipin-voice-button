import User from '@/models/user.model'
import { RoleMatcherFn } from '@/utils/role_match'
import { createParamDecorator } from 'routing-controllers'

export function UserInject(required = false) {
  return createParamDecorator({
    required,
    value: async (action) => {
      return action.request.user as User
    }
  })
}

export function Authorize() {
  return createParamDecorator({
    required: true,
    value: async (action) => {
      return action.request.user as User
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
