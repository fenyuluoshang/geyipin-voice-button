import { AnchorDTO } from './anchor'
import { GetTagsFilter } from './tags'
export declare class VoiceTagDTO {
  id: number
  title: string
  anchor?: AnchorDTO
  voices?: VoiceDTO[]
}
export declare class VoiceDTO {
  id: number
  title: string
  source?: string
  anchor?: AnchorDTO
  tags?: VoiceTagDTO[]
  playTime: bigint
}
export declare class PlayRequestPlayed {
  voiceId: number
  time: number
}
export declare class PlayRequestDTO {
  played: PlayRequestPlayed[]
}
export declare class UploadSTSRequest {
  title: string
  file: string
  anchor: number
}
export declare class VoiceFilter {
  title?: string
  anchorId?: number
  tags?: GetTagsFilter
  uploader?: number
  includes?: ('anchor' | 'tag' | 'uploader')[]
  all_status?: boolean
}
export declare class VoiceTagRequest {
  tagId: number
  voiceIds: number[]
}
