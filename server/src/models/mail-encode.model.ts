import { Column, Entity } from 'typeorm'
import { BaseModel } from './base'

@Entity()
class MailEncode extends BaseModel {
  @Column()
  declare mail: string

  @Column()
  declare code: number

  @Column()
  declare expirTime: Date

  @Column({ default: false })
  declare hasUsed: boolean
}

export default MailEncode
