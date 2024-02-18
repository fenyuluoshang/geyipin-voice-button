import Anchor from '@/models/anchor.model'
import { AnchorDTO } from './anchor'
import { IsIn, IsInt, IsString, ValidateIf } from 'class-validator'

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

export class AdminAnchorWithRoleDTO extends AnchorDTO {
  role: AnchorRoleMap
  constructor(anchor: Anchor, role: AnchorRoleMap) {
    super(anchor)
    this.role = role
  }
}

export class UpdateFileRequestDTO {
  @IsString()
  declare file: string

  @IsIn(['voice', 'emotion', 'image'])
  declare type: 'voice' | 'emotion' | 'image'

  @IsInt()
  declare anchorId: number

  @ValidateIf((e: UpdateFileRequestDTO) => e.type === 'voice')
  @IsString()
  declare title: string
}
