import Anchor from '@/models/anchor.model'
import { VoiceDTO } from './voice'

export class AnchorDTO {
  id: number
  anchorName?: string
  anchorTitle?: string
  pathName?: string
  biliId?: number
  biliveId?: number
  lastVideoBV?: string
  primaryColor?: string
  secondColor?: string
  primaryColorDark?: string
  secondColorDark?: string
  btnColor?: string
  createAt?: Date
  updateAt?: Date
  voices?: VoiceDTO[]

  constructor(anchor: Anchor) {
    this.id = anchor.id
    this.anchorName = anchor.anchorName
    this.anchorTitle = anchor.anchorTitle
    this.pathName = anchor.pathName
    this.biliId = anchor.biliId
    this.biliveId = anchor.biliveId
    this.lastVideoBV = anchor.lastVideoBV
    this.primaryColor = anchor.primaryColor
    this.secondColor = anchor.secondColor
    this.primaryColorDark = anchor.primaryColorDark
    this.secondColorDark = anchor.secondColorDark
    this.btnColor = anchor.btnColor
    this.createAt = anchor.createAt
    this.updateAt = anchor.updateAt

    if (anchor.voices) this.voices = anchor.voices.map((item) => new VoiceDTO(item))
  }
}
