import { Column, Entity } from 'typeorm'
import { BaseModel } from './base'

@Entity()
class PhoneEncode extends BaseModel {
  @Column()
  declare phone: string

  @Column()
  declare code: number

  @Column()
  declare expirTime: Date

  @Column({ default: false })
  declare hasUsed: boolean
}

export default PhoneEncode
