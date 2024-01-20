import Anchor from '@/models/anchor.model'
import { Service } from 'typedi'

@Service()
class AnchorService {
  async getAnchorInfo(anchorPathName: string) {
    const anchor = await Anchor.findOneBy({ pathName: anchorPathName })
    return anchor
  }

  async getVoiceByAnchor(anchorPathName: string) {
    const anchor = await Anchor.findOne({
      where: { pathName: anchorPathName },
      relations: {
        voices: {
          tags: true
        }
      }
    })
    return anchor
  }

  async getEmoticonsByAnchor(anchorPathName: string) {
    const anchor = await Anchor.findOne({
      where: { pathName: anchorPathName },
      relations: {
        emoticons: {
          tags: true
        }
      }
    })
    return anchor
  }
}

export default AnchorService
