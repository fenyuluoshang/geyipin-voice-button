import EmoticonTag from '@/models/emoticon-tag.model'
import { AnchorDTO } from './anchor'
import Emoticons from '@/models/emoticons.model'
import { IsArray, IsBoolean, IsInt, IsOptional, IsString } from 'class-validator'
import { GetTagsFilter } from './tags'
import { ArrayIsIn } from '@/decorators/validator'

export class EmoticonTagDTO {
  id: number
  title: string
  anchor?: AnchorDTO
  emoticons?: EmoticonDTO[]

  constructor(emoticon_tag: EmoticonTag) {
    this.id = emoticon_tag.id
    this.title = emoticon_tag.title

    if (emoticon_tag.anchor) this.anchor = new AnchorDTO(emoticon_tag.anchor)

    if (emoticon_tag.emoticons)
      this.emoticons = emoticon_tag.emoticons.map((item) => new EmoticonDTO(item))
  }
}

export class EmoticonDTO {
  id: number
  source?: string
  anchor?: AnchorDTO
  tags?: EmoticonDTO[]

  constructor(emoticon: Emoticons) {
    this.id = emoticon.id
    this.source = emoticon.source
    if (emoticon.anchor) this.anchor = new AnchorDTO(emoticon.anchor)
    if (emoticon.tags) this.tags = emoticon.tags.map((item) => new EmoticonTagDTO(item))
  }
}

export class UploadSTSRequest {
  @IsString()
  declare file: string
  @IsInt()
  declare anchor: number
}

export class EmoticonFilter {
  @IsInt()
  @IsOptional()
  declare anchorId?: number

  @IsOptional()
  declare tags?: GetTagsFilter

  @IsInt()
  @IsOptional()
  declare uploader?: number

  @ArrayIsIn(['anchor', 'tag', 'uploader'])
  @IsOptional()
  declare includes?: ('anchor' | 'tag' | 'uploader')[]

  @IsBoolean()
  @IsOptional()
  declare all_status?: boolean
}

export class EmoticonTagRequest {
  @IsInt()
  declare tagId: number

  @IsArray()
  declare emoticonsId: number[]
}
