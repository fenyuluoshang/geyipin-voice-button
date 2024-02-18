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

  async updateFile(body: UpdateFileRequestDTO, roleMatcher: RoleMatcherFn) {
    const anchor = await Anchor.findOneBy({
      id: body.anchorId
    })
    if (!anchor) {
      throw NotFoundError()
    }
    roleMatcher(`/anchor/${anchor.id}/${body.type}/update`)
    if (body.type === 'voice') {
      const voice = await this.voiceService.saveFile({
        title: body.title,
        file: body.url,
        anchorId: body.anchorId
      })
      voice.status = UploadStatus.ALLOW
    }
    await this.fileServices.setFilePublicRead(body.url)
  }
}

export default AdminServices
