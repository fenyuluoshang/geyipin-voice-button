import { Column, Entity } from 'typeorm'
import { BaseModel } from './base'

@Entity()
class Emoticons extends BaseModel {
  @Column()
  declare title: string

  @Column({ nullable: true })
  declare source: string
}

export default Emoticons
