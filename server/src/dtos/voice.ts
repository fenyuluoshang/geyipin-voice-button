import VoiceTag from '@/models/voice-tag.model'
import { AnchorDTO } from './anchor'
import Voices from '@/models/voices.model'
import { IsArray, IsInt, Length, Max, Min } from 'class-validator'

export class VoiceTagDTO {
  title: string
  anchor?: AnchorDTO
  voices?: VoiceDTO[]

  constructor(voice_tag: VoiceTag) {
    this.title = voice_tag.title

    if (voice_tag.anchor) this.anchor = new AnchorDTO(voice_tag.anchor)

    if (voice_tag.voices) this.voices = voice_tag.voices.map((item) => new VoiceDTO(item))
  }
}

export class VoiceDTO {
  title: string
  source?: string
  anchor?: AnchorDTO
  tags?: VoiceTagDTO[]
  playTime: bigint

  constructor(voice: Voices) {
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
  @Length(1, 12)
  declare played: PlayRequestPlayed[]
}
