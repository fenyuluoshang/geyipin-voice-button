import { Column, Entity, Index } from 'typeorm'
import { BaseModel } from './base'

@Entity()
class MailEncode extends BaseModel {
  @Column()
  @Index()
  declare mail: string

  @Column()
  declare code: number

  @Column()
  declare expirTime: Date

  @Column({ default: false })
  declare hasUsed: boolean
}

export default MailEncode
