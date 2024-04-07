import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import Emoticons from '@/models/emoticons.model'
import User from '@/models/user.model'
import { Inject, Service } from 'typedi'
import FileServices from './file.services'
import { FileNotExitError } from '@/errors/file'
import EmoticonTag from '@/models/emoticon-tag.model'
import { CreateTagRequest, GetTagsFilter } from '@/dtos/tags'
import {
  DataSource,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  IsNull
} from 'typeorm'
import { PageRequestDTO } from '@/dtos'
import { getFindOptionsByPage } from '@/utils/page'
import { UploadStatus } from '@/models/upload.base'
import { EmoticonFilter, EmoticonTagRequest } from '@/dtos/emoticon'
import { RoleMatcherFn } from '@/utils/role_match'

@Service()
class EmoticonsService {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource
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

  optionsByEmotionFilter(filter: EmoticonFilter, by?: ('tag' | 'anchor' | 'user')[]) {
    const where: FindOptionsWhere<Emoticons> = {}
    const relations: FindOptionsRelations<Emoticons> = {}
    const option: FindManyOptions<Emoticons> = { where, relations }

    if (filter.anchorId) {
      where.anchorId = filter.anchorId
    }

    if (filter.tags && !by?.includes('tag')) {
      const tagOption = this.optionsByTagFilter(filter.tags, ['voice'])
      where.tags = tagOption.where
      relations.tags = (tagOption?.relations as FindOptionsRelations<Emoticons>) || true
    }

    return option
  }

  optionsByTagFilter(
    filter: GetTagsFilter,
    by?: ('voice' | 'anchor' | 'user')[]
  ): FindManyOptions<EmoticonTag> {
    const where: FindOptionsWhere<EmoticonTag> = {}
    const relations: FindOptionsRelations<EmoticonTag> = {}
    const option: FindManyOptions<EmoticonTag> = { where, relations }
    if (filter.anchorId) {
      where.anchorId = filter.anchorId
    }
    if (filter.includes?.includes('anchor') && !by?.includes('anchor')) {
      relations.anchor = true
    }

    if (filter.includes?.includes('voice') && !by?.includes('voice')) {
      const voiceOption = filter.voice && this.optionsByEmotionFilter(filter.voice, ['tag'])
      where.emoticons = [
        {
          status: UploadStatus.ALLOW,
          ...voiceOption?.where
        },
        { id: IsNull() }
      ]
      relations.emoticons = (voiceOption?.relations as FindOptionsRelations<Emoticons>) || true
    }

    return option
  }

  async getTags(filter: GetTagsFilter, page: PageRequestDTO) {
    return await EmoticonTag.findAndCount({
      ...this.optionsByTagFilter(filter),
      ...getFindOptionsByPage(page)
    })
  }

  async list(data: EmoticonFilter, page: PageRequestDTO) {
    return Emoticons.findAndCount({
      where: {
        anchorId: data.anchorId,
        uploaderId: data.uploader,
        status: UploadStatus.ALLOW
      },
      ...getFindOptionsByPage(page)
    })
  }

  async updateTagEmoticons(data: EmoticonTagRequest) {
    const tag = await EmoticonTag.findOne({
      where: { id: data.tagId },
      relations: {
        emoticons: true
      }
    })
    if (!tag) {
      throw NotFoundError()
    }
    tag.emoticons = await Emoticons.findBy({ id: In(data.emoticonsId) })
    await this.AppDataSource.manager.save(tag)
  }

  async deleteTags(id: number, roleMatcher: RoleMatcherFn) {
    return await this.AppDataSource.transaction(async (transaction) => {
      const tag = await transaction.findOne(EmoticonTag, {
        where: { id },
        relations: {
          emoticons: true
        },
        transaction: true
      })

      if (!tag) {
        throw NotFoundError()
      }
      roleMatcher(`/anchor/${tag.anchorId}/tag/delete`)

      tag.emoticons = []
      await transaction.save(tag)
      await transaction.remove(tag)
    })
  }
}

export default EmoticonsService
