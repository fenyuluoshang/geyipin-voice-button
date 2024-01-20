import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import { BaseModel } from './base'
import Anchor from './anchor.model'
import VoiceTag from './voice-tag.model'

@Entity()
class Voices extends BaseModel {
  @Column()
  declare title: string

  @Column({ nullable: true })
  declare source?: string

  @ManyToOne(() => Anchor)
  declare anchor: Anchor

  @ManyToMany(() => VoiceTag, (tag) => tag.voices)
  @JoinTable()
  declare tags: VoiceTag[]

  @Column({ type: 'bigint' })
  declare playTime: bigint
}

export default Voices
