import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import Emoticons from '@/models/emoticons.model'
import User from '@/models/user.model'
import { Inject, Service } from 'typedi'
import FileServices from './file.services'
import { FileNotExitError } from '@/errors/file'
import EmoticonTag from '@/models/emoticon-tag.model'
import { CreateTagRequest } from '@/dtos/tags'

@Service()
class EmoticonsService {
  @Inject()
  private declare fileServices: FileServices

  async createemoticonEntity(data: { source: string }, anchor: Anchor, user?: User) {
    if (!(await this.fileServices.exitFile(data.source))) {
      throw FileNotExitError()
    }
    const emoticon = new Emoticons()
    if (user) {
      emoticon.uploaderId = user.id
    }
    emoticon.source = data.source
    emoticon.anchor = anchor
    return emoticon
  }

  async saveFile(data: { file: string; anchorId: number }, user?: User) {
    const anchor = await Anchor.findOneBy({ id: data.anchorId })
    if (!anchor) {
      throw NotFoundError()
    }
    const emoticon = await this.createemoticonEntity({ source: data.file }, anchor, user)
    return await emoticon.save()
  }

  async createTag(data: CreateTagRequest) {
    const tag = new EmoticonTag()
    tag.anchorId = data.anchorId
    tag.title = data.title
    return tag.save()
  }
}

export default EmoticonsService
