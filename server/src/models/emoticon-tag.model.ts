import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import Anchor from './anchor.model'
import Emoticons from './emoticons.model'
import { BaseModel } from './base'

@Entity()
export class VoiceTag extends BaseModel {
  @Column()
  declare title: string

  @ManyToOne(() => Anchor)
  declare anchor: Anchor

  @ManyToMany(() => Emoticons)
  declare emoticons: Emoticons[]
}

export default VoiceTag
