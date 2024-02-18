import {
  AdminAnchorWithRoleDTO,
  AnchorRoleMap,
  AnchorRoles,
  UpdateFileRequestDTO
} from '@/dtos/admin'
import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import { RoleMatcherFn } from '@/utils/role_match'
import { Inject, Service } from 'typedi'
import FileServices from './file.services'
import VoiceService from './voice.services'
import { UploadStatus } from '@/models/upload.base'
import User from '@/models/user.model'

@Service()
class AdminServices {
  @Inject()
  private declare fileServices: FileServices
  @Inject()
  private declare voiceService: VoiceService

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

  async updateFile(body: UpdateFileRequestDTO, roleMatcher: RoleMatcherFn, user: User) {
    const anchor = await Anchor.findOneBy({
      id: body.anchorId
    })
    if (!anchor) {
      throw NotFoundError()
    }
    roleMatcher(`/anchor/${anchor.id}/${body.type}/update`)
    if (body.type === 'voice') {
      const voice = await this.voiceService.createVoiceEntity(
        {
          title: body.title,
          source: body.file
        },
        anchor,
        user
      )

      voice.status = UploadStatus.ALLOW
      console.log(await voice.save())
    }
    await this.fileServices.setFilePublicRead(body.file)
  }
}

export default AdminServices
