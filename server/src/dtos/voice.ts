import VoiceTag from '@/models/voice-tag.model'
import { AnchorDTO } from './anchor'
import Voices from '@/models/voices.model'
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator'
import { ArrayIsIn } from '@/decorators/validator'
import { GetTagsFilter } from './tags'

export class VoiceTagDTO {
  id: number
  title: string
  anchor?: AnchorDTO
  voices?: VoiceDTO[]

  constructor(voice_tag: VoiceTag) {
    this.id = voice_tag.id
    this.title = voice_tag.title

    if (voice_tag.anchor) this.anchor = new AnchorDTO(voice_tag.anchor)

    if (voice_tag.voices) this.voices = voice_tag.voices.map((item) => new VoiceDTO(item))
  }
}

export class VoiceDTO {
  id: number
  title: string
  source?: string
  anchor?: AnchorDTO
  tags?: VoiceTagDTO[]
  playTime: bigint

  constructor(voice: Voices) {
    this.id = voice.id
    this.title = voice.title
    this.source = voice.source
    this.playTime = voice.playTime

    if (voice.anchor) this.anchor = new AnchorDTO(voice.anchor)

    if (voice.tags) this.tags = voice.tags.map((item) => new VoiceTagDTO(item))
  }
}

export class PlayRequestPlayed {
  @IsInt()
  @Min(0)
  @Max(10)
  declare voiceId: number

  @IsInt()
  @Min(0)
  @Max(20)
  declare time: number
}

export class PlayRequestDTO {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(16)
  declare played: PlayRequestPlayed[]
}

export class UploadSTSRequest {
  @IsString()
  declare title: string
  @IsString()
  declare file: string
  @IsInt()
  declare anchor: number
}

export class VoiceFilter {
  @IsString()
  @IsOptional()
  declare title?: string

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

export class VoiceTagRequest {
  @IsInt()
  declare tagId: number

  @IsArray()
  declare voiceIds: number[]
}
