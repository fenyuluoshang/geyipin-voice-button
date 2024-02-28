import { Column, Entity, ManyToMany } from 'typeorm'
import { UploadModel } from './upload.base'
import EmoticonTag from './emoticon-tag.model'

@Entity()
class Emoticons extends UploadModel {
  @Column({ nullable: true })
  declare source: string

  @ManyToMany(() => EmoticonTag, (tag) => tag.emoticons)
  declare tags: EmoticonTag[]
}

export default Emoticons
