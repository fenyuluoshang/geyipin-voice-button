import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { UploadModel } from './upload.base'
import VoiceTag from './voice-tag.model'

@Entity()
class Voices extends UploadModel {
  @Column()
  declare title: string

  @Column({ nullable: true })
  declare source?: string

  @ManyToMany(() => VoiceTag, (tag) => tag.voices)
  @JoinTable()
  declare tags: VoiceTag[]

  @Column({ type: 'bigint', default: BigInt(0) })
  declare playTime: bigint
}

export default Voices
