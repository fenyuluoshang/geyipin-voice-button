import AdminAnchorWithRoleDTO, { AnchorRoleMap, AnchorRoles } from '@/dtos/admin'
import Anchor from '@/models/anchor.model'
import { RoleMatcherFn } from '@/utils/role_match'
import { Service } from 'typedi'

@Service()
class AdminServices {
  async getAnchorWithRole(roleMatcher: RoleMatcherFn) {
    const anchors = await Anchor.find()
    return anchors.map((anchor) => {
      const roleMap: Partial<AnchorRoleMap> = {}
      for (const role of AnchorRoles) {
        roleMap[role] = roleMatcher(`/anchor/${anchor.id}${role}`, true)
      }

      return new AdminAnchorWithRoleDTO(anchor, roleMap as AnchorRoleMap)
    })
  }
}

export default AdminServices
