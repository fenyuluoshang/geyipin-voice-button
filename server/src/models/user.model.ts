import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from './index.base'
import UserGroup from './user-group.model'
import Role from './role.model'

@Entity()
class User extends BaseModel {
  @Index()
  @Column({ nullable: true })
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

  @Column({ nullable: true, foreignKeyConstraintName: 'group' })
  declare groupId?: number

  @OneToMany(() => Role, (role) => role.user)
  declare roles: Role[]
}

export default User
