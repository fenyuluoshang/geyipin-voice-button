import EmoticonTag from '@/models/emoticon-tag.model'
import { AnchorDTO } from './anchor'
import Emoticons from '@/models/emoticons.model'
import { IsInt, IsString } from 'class-validator'

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
