import { Column, Entity, Index } from 'typeorm'
import { BaseModel } from './base'

@Entity()
class PhoneEncode extends BaseModel {
  @Column()
  @Index()
  declare phone: string

  @Column()
  declare code: number

  @Column()
  declare expirTime: Date

  @Column({ default: false })
  declare hasUsed: boolean
}

export default PhoneEncode
