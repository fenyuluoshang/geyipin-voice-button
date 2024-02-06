import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import Emoticons from '@/models/emoticons.model'
import User from '@/models/user.model'
import { Service } from 'typedi'

@Service()
class EmoticonsService {
  async saveFile(data: { file: string; anchorId: number }, user?: User) {
    const anchor = await Anchor.findOneBy({ id: data.anchorId })
    if (!anchor) {
      throw NotFoundError()
    }
    const emoticon = new Emoticons()
    if (user) {
      emoticon.uploaderId = user.id
    }
    emoticon.source = data.file
    emoticon.anchor = anchor
    await emoticon.save()
    return emoticon
  }
}

export default EmoticonsService
