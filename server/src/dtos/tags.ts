import { ArrayIsIn } from '@/decorators/validator'
import { IsInt, IsObject, IsOptional } from 'class-validator'
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
