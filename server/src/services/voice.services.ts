import { PlayRequestDTO } from '@/dtos/voice'
import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import User from '@/models/user.model'
import Voices from '@/models/voices.model'
import { Inject, Service } from 'typedi'
import { DataSource, In } from 'typeorm'

@Service()
class VoiceService {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource

  async play(data: PlayRequestDTO) {
    return await this.AppDataSource.transaction(async (transaction) => {
      const voices = await transaction.find(Voices, {
        where: {
          id: In(data.played.map((item) => item.voiceId))
        },
        select: ['id', 'playTime']
      })

      if (voices.length !== data.played.length) {
        throw NotFoundError()
      }

      await Promise.all(
        voices.map((item) => {
          const add = data.played.find((palyed) => item.id === palyed.voiceId)?.time
          return transaction.update(Voices, item.id, {
            playTime: item.playTime + BigInt(add || 0)
          })
        })
      )

      return true
    })
  }

  async saveFile(data: { title: string; file: string; anchorId: number }, user?: User) {
    const anchor = await Anchor.findOneBy({ id: data.anchorId })
    if (!anchor) {
      throw NotFoundError()
    }
    const voice = new Voices()
    if (user) {
      voice.uploaderId = user.id
    }
    voice.title = data.title
    voice.source = data.file
    voice.anchor = anchor
    await voice.save()
    return voice
  }
}

export default VoiceService
