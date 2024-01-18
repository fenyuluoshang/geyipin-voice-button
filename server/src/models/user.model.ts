import { Column, Entity, Index } from 'typeorm'
import { BaseModel } from './base'

@Entity()
class User extends BaseModel {
  @Index()
  @Column({ nullable: false })
  declare name: string

  @Column({ nullable: true })
  declare nickName: string

  @Column({ nullable: true })
  declare phone: string

  @Column({ nullable: true })
  declare mail: string

  @Column({ nullable: true })
  declare pass: string

  @Column({ nullable: true })
  declare salt: string
}

export default User
