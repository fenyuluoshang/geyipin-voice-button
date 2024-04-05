import { ArrayIsIn } from '@/decorators/validator'
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator'
import { VoiceFilter } from './voice'

export class GetTagsFilter {
  @IsInt()
  declare anchorId: number

  @ArrayIsIn(['anchor', 'voice', 'emoticon'])
  @IsOptional()
  declare includes?: ('anchor' | 'voice' | 'emoticon')[]

  @IsObject()
  @IsOptional()
  declare voice?: VoiceFilter
}

export class CreateTagRequest {
  @IsString()
  declare title: string

  @IsInt()
  declare anchorId: number
}

export class TagAddVoice {
  @IsInt()
  declare tagId: number

  @IsInt()
  declare targetId: number
}
