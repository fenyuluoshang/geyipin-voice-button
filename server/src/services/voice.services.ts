import { PlayRequestDTO } from '@/dtos/voice'
import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import User from '@/models/user.model'
import Voices from '@/models/voices.model'
import { Inject, Service } from 'typedi'
import { DataSource, In } from 'typeorm'
import FileServices from './file.services'
import { FileNotExitError } from '@/errors/file'

@Service()
class VoiceService {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource
  @Inject()
  private declare fileServices: FileServices

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

  async createVoiceEntity(data: { title: string; source: string }, anchor: Anchor, user?: User) {
    if (!(await this.fileServices.exitFile(data.source))) {
      throw FileNotExitError()
    }
    const voice = new Voices()
    if (user) {
      voice.uploaderId = user.id
    }
    voice.title = data.title
    voice.source = data.source
    voice.anchor = anchor
    return voice
  }

  async saveFile(data: { title: string; file: string; anchorId: number }, user?: User) {
    const anchor = await Anchor.findOneBy({ id: data.anchorId })
    console.log(anchor)
    if (!anchor) {
      throw NotFoundError()
    }

    return (
      await this.createVoiceEntity({ title: data.title, source: data.file }, anchor, user)
    ).save()
  }
}

export default VoiceService
