import { NoPermissionError } from '@/errors'
import Role from '@/models/role.model'
import User from '@/models/user.model'
import { minimatch } from 'minimatch'

export interface RoleMatcherFn {
  /**
   * @param allow_false default false
   */
  (role: string, allow_false?: boolean): boolean
}

export function createRoleMatch(user?: User): RoleMatcherFn {
  if (!user)
    return (_, allow_false: boolean = false) => {
      if (!allow_false) throw NoPermissionError()
      return false
    }

  const roles: Role[] = [...user.roles, ...(user.group?.roles || [])]
  const roleStrs = roles.map((item) => item.roleStr)

  return (val: string, allow_false: boolean = false) => {
    const result = roleStrs.some((role) => minimatch(val, role))
    if (!allow_false && !result) throw NoPermissionError()
    return result
  }
}
