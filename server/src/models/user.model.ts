import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from './base'
import UserGroup from './user-group.model'
import Role from './role.model'

@Entity()
class User extends BaseModel {
  @Index()
  @Column()
  declare name: string

  @Column({ nullable: true })
  declare nickName?: string

  @Index()
  @Column({ nullable: true })
  declare phone?: string

  @Index()
  @Column({ nullable: true })
  declare mail?: string

  @Column({ nullable: true })
  declare pass?: string

  @Column({ nullable: true })
  declare salt?: string

  @ManyToOne(() => UserGroup)
  declare group?: UserGroup

  @OneToMany(() => Role, (role) => role.user)
  declare roles: Role[]
}

export default User
