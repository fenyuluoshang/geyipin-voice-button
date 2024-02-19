import { minimatch } from 'minimatch'
import useUserStore from '~/stores/user'

export function useRole(role: MaybeRef<string>) {
  const userStore = useUserStore()

  return computed(() => {
    const roleStr = unref(role)
    return userStore.userStatus?.roleMerge?.some((r) => minimatch(roleStr, r)) || false
  })
}

export function useRoleBatch(roles: MaybeRef<string[]>) {
  const userStore = useUserStore()

  return computed(() => {
    const rolesStrs = unref(roles)

    return rolesStrs.map((roleStr) => {
      return userStore.userStatus?.roleMerge?.some((r) => minimatch(roleStr, r)) || false
    })
  })
}
