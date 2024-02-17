import Anchor from '@/models/anchor.model'
import { AnchorDTO } from './anchor'

export const AnchorRoles = [
  '/voice/update',
  '/voice/check',
  '/voice/tags',
  '/emotion/update',
  '/emotion/check',
  '/emotion/tags'
] as const

export type AnchorRoleMap = {
  [key in (typeof AnchorRoles)[number]]: boolean
}

class AdminAnchorWithRoleDTO extends AnchorDTO {
  role: AnchorRoleMap
  constructor(anchor: Anchor, role: AnchorRoleMap) {
    super(anchor)
    this.role = role
  }
}

export default AdminAnchorWithRoleDTO
