import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import Anchor from './anchor.model'
import Voices from './voices.model'
import { BaseModel } from './index.base'

@Entity()
export class VoiceTag extends BaseModel {
  @Column()
  declare title: string

  @ManyToOne(() => Anchor)
  declare anchor: Anchor

  @Column()
  declare anchorId: number

  @ManyToMany(() => Voices, (voice) => voice.tags)
  declare voices: Voices[]
}

export default VoiceTag
