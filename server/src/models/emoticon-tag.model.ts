import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import Anchor from './anchor.model'
import Emoticons from './emoticons.model'
import { BaseModel } from './index.base'

@Entity()
export class EmoticonTag extends BaseModel {
  @Column()
  declare title: string

  @ManyToOne(() => Anchor)
  declare anchor: Anchor

  @ManyToMany(() => Emoticons, (emoticon) => emoticon.tags)
  @JoinTable()
  declare emoticons: Emoticons[]
}

export default EmoticonTag
