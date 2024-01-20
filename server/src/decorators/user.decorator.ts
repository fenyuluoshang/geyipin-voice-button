import User from '@/models/user.model'
import { createParamDecorator } from 'routing-controllers'

export function UserInject() {
  return createParamDecorator({
    required: false,
    value: (action) => {
      return action.request.user as User
    }
  })
}
