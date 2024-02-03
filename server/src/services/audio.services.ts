import { PlayRequestDTO } from '@/dtos/voice'
import { NotFoundError } from '@/errors'
import Voices from '@/models/voices.model'
import { Inject, Service } from 'typedi'
import { DataSource, In } from 'typeorm'

@Service()
class AudioService {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource

  async play(data: PlayRequestDTO) {
    return await this.AppDataSource.transaction(async (transaction) => {
      const audios = await transaction.find(Voices, {
        where: {
          id: In(data.played.map((item) => item.voiceId))
        },
        select: ['id', 'playTime']
      })

      if (audios.length !== data.played.length) {
        throw NotFoundError()
      }

      await Promise.all(
        audios.map((item) => {
          const add = data.played.find((palyed) => item.id === palyed.voiceId)?.time
          return transaction.update(Voices, item.id, {
            playTime: item.playTime + BigInt(add || 0)
          })
        })
      )

      return true
    })
  }
}

export default AudioService
