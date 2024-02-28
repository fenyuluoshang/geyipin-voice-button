import { AnchorDTO } from './anchor'
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
