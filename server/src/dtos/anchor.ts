import Anchor from '@/models/anchor.model'
import { VoiceDTO } from './voice'
import { IsNumber, IsOptional, IsString } from 'class-validator'

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

export class AnchorCreateRequest {
  @IsString()
  declare anchorName: string

  @IsString()
  declare anchorTitle: string

  @IsString()
  declare pathName: string

  @IsOptional()
  @IsNumber()
  declare biliId?: number

  @IsOptional()
  @IsNumber()
  declare biliveId?: number

  @IsOptional()
  @IsString()
  declare lastVideoBV?: string

  @IsOptional()
  @IsString()
  declare primaryColor?: string

  @IsOptional()
  @IsString()
  declare secondColor?: string

  @IsOptional()
  @IsString()
  declare primaryColorDark?: string

  @IsOptional()
  @IsString()
  declare secondColorDark?: string

  @IsOptional()
  @IsString()
  declare btnColor?: string
}

export class AnchorEditRequest {
  @IsOptional()
  @IsString()
  declare anchorName?: string

  @IsOptional()
  @IsString()
  declare anchorTitle?: string

  @IsOptional()
  @IsString()
  declare pathName?: string

  @IsOptional()
  @IsNumber()
  declare biliId?: number

  @IsOptional()
  @IsNumber()
  declare biliveId?: number

  @IsOptional()
  @IsString()
  declare lastVideoBV?: string

  @IsOptional()
  @IsString()
  declare primaryColor?: string

  @IsOptional()
  @IsString()
  declare secondColor?: string

  @IsOptional()
  @IsString()
  declare primaryColorDark?: string

  @IsOptional()
  @IsString()
  declare secondColorDark?: string

  @IsOptional()
  @IsString()
  declare btnColor?: string
}
