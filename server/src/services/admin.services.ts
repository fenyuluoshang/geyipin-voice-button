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
import EmoticonsService from './emoticons.services'
import { PageRequestDTO } from '@/dtos'

@Service()
class AdminServices {
  @Inject()
  private declare fileServices: FileServices
  @Inject()
  private declare voiceService: VoiceService
  @Inject()
  private declare emoticonService: EmoticonsService

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
      await voice.save()
    } else if (body.type === 'emoticon') {
      const emoticon = await this.emoticonService.createemoticonEntity(
        {
          source: body.file
        },
        anchor,
        user
      )
      emoticon.status = UploadStatus.ALLOW
      await emoticon.save()
    } else {
      throw new Error('Not support type')
    }
    await this.fileServices.setFilePublicRead(body.file)
  }

  async getAllUserWithPage(page: PageRequestDTO, roleMatcher: RoleMatcherFn) {
    const relations = ['group']
    if (roleMatcher('/user/role')) {
      relations.push('roles', 'group.roles')
    }
    const users = await User.findAndCount({
      skip: page.pageSize * (page.page - 1),
      take: page.pageSize,
      relations
    })
    return users
  }
}

export default AdminServices
