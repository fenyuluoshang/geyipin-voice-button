import { PlayRequestDTO, VoiceFilter } from '@/dtos/voice'
import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import User from '@/models/user.model'
import Voices from '@/models/voices.model'
import { Inject, Service } from 'typedi'
import {
  DataSource,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Like
} from 'typeorm'
import FileServices from './file.services'
import { FileNotExitError } from '@/errors/file'
import { GetTagsFilter } from '@/dtos/tags'
import { PageRequestDTO } from '@/dtos'
import { getFindOptionsByPage } from '@/utils/page'
import VoiceTag from '@/models/voice-tag.model'
import { UploadStatus } from '@/models/upload.base'

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
    if (!anchor) {
      throw NotFoundError()
    }

    return (
      await this.createVoiceEntity({ title: data.title, source: data.file }, anchor, user)
    ).save()
  }

  optionsByVoiceFilter(filter: VoiceFilter, by?: ('tag' | 'anchor' | 'user')[]) {
    const where: FindOptionsWhere<Voices> = {}
    const relations: FindOptionsRelations<Voices> = {}
    const option: FindManyOptions<Voices> = { where, relations }

    if (filter.title) {
      where.title = Like(`%${filter.title}%`)
    }

    if (filter.anchorId) {
      where.anchorId = filter.anchorId
    }

    if (filter.tags && !by?.includes('tag')) {
      const tagOption = this.optionsByTagFilter(filter.tags, ['voice'])
      where.tags = tagOption.where
      relations.tags = (tagOption?.relations as FindOptionsRelations<VoiceTag>) || true
    }

    return option
  }

  optionsByTagFilter(
    filter: GetTagsFilter,
    by?: ('voice' | 'anchor' | 'user')[]
  ): FindManyOptions<VoiceTag> {
    const where: FindOptionsWhere<VoiceTag> = {}
    const relations: FindOptionsRelations<VoiceTag> = {}
    const option: FindManyOptions<VoiceTag> = { where, relations }
    if (filter.anchorId) {
      where.anchorId = filter.anchorId
    }
    if (filter.includes?.includes('anchor') && !by?.includes('anchor')) {
      relations.anchor = true
    }

    if (filter.includes?.includes('voice') && !by?.includes('voice')) {
      const voiceOption = filter.voice && this.optionsByVoiceFilter(filter.voice, ['tag'])
      where.voices = {
        status: UploadStatus.ALLOW,
        ...voiceOption?.where
      }
      relations.voices = (voiceOption?.relations as FindOptionsRelations<Voices>) || true
    }

    return option
  }

  async getTags(filter: GetTagsFilter, page: PageRequestDTO) {
    return await VoiceTag.findAndCount({
      ...this.optionsByTagFilter(filter),
      ...getFindOptionsByPage(page)
    })
  }
}

export default VoiceService
