import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm'
import { BaseModel } from './index.base'
import Voices from './voices.model'
import Emoticons from './emoticons.model'
import BliveCaptainModel from './bilive-captain.model'
import VoiceTag from './voice-tag.model'

@Entity()
class Anchor extends BaseModel {
  @Column()
  declare anchorName: string

  @Column()
  declare anchorTitle: string

  @Column()
  @Index()
  declare pathName: string

  @Column({ nullable: true })
  declare biliId: number

  @Column({ nullable: true })
  declare biliveId: number

  @Column({ nullable: true })
  declare lastVideoBV: string

  @Column({ nullable: true })
  declare primaryColor: string

  @Column({ nullable: true })
  declare secondColor: string

  @Column({ nullable: true })
  declare primaryColorDark: string

  @Column({ nullable: true })
  declare secondColorDark: string

  @Column({ nullable: true })
  declare btnColor: string

  @OneToMany(() => Voices, (voice) => voice.anchor)
  declare voices: Voices[]

  @OneToMany(() => Emoticons, (emoticon) => emoticon.anchor)
  declare emoticons: Emoticons[]

  @OneToOne(() => BliveCaptainModel, (bliveCaptain) => bliveCaptain.anchor)
  declare biliveCaptain?: BliveCaptainModel

  @OneToMany(() => VoiceTag, (tag) => tag.anchor)
  declare voiceTags: VoiceTag[]

  @Column({ nullable: true })
  declare favIcon: string

  @Column({ nullable: true })
  declare icon: string

  @Column({ nullable: true })
  declare bgImg: string

  @Column({ nullable: true })
  declare bgImgDark: string
}

export default Anchor
