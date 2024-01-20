import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import Anchor from './anchor.model'
import Voices from './voices.model'
import { BaseModel } from './base'

@Entity()
export class VoiceTag extends BaseModel {
  @Column()
  declare title: string

  @ManyToOne(() => Anchor)
  declare anchor: Anchor

  @ManyToMany(() => Voices, (voice) => voice.tags)
  declare voices: Voices[]
}

export default VoiceTag
