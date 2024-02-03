import { Column, Entity, Index } from 'typeorm'
import { BaseModel } from './base'

@Entity()
class PhoneEncode extends BaseModel {
  @Column()
  @Index()
  declare phone: string

  @Column({ length: 12 })
  declare code: string

  @Column()
  declare expirTime: Date

  @Column({ default: false })
  declare hasUsed: boolean
}

export default PhoneEncode
