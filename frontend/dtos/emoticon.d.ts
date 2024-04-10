import { AnchorDTO } from './anchor'
import { GetTagsFilter } from './tags'
export declare class EmoticonTagDTO {
  id: number
  title: string
  anchor?: AnchorDTO
  emoticons?: EmoticonDTO[]
}
export declare class EmoticonDTO {
  id: number
  source?: string
  anchor?: AnchorDTO
  tags?: EmoticonDTO[]
}
export declare class UploadSTSRequest {
  file: string
  anchor: number
}
export declare class EmoticonFilter {
  anchorId?: number
  tags?: GetTagsFilter
  uploader?: number
  includes?: ('anchor' | 'tag' | 'uploader')[]
  all_status?: boolean
}
export declare class EmoticonTagRequest {
  tagId: number
  emoticonsId: number[]
}
