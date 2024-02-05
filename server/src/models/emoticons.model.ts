import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm'
import { UploadModel } from './upload.base'
import Anchor from './anchor.model'
import EmoticonTag from './emoticon-tag.model'

@Entity()
class Emoticons extends UploadModel {
  @Column()
  declare title: string

  @Column({ nullable: true })
  declare source: string

  @ManyToOne(() => Anchor)
  declare anchor: Anchor

  @ManyToMany(() => EmoticonTag, (tag) => tag.emoticons)
  declare tags: EmoticonTag[]
}

export default Emoticons
