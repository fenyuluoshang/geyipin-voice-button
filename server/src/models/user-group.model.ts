import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel } from './index.base'
import User from './user.model'
import Role from './role.model'

@Entity()
class UserGroup extends BaseModel {
  @Column({ nullable: true })
  declare title?: string

  @OneToMany(() => User, (user) => user.group)
  declare users?: User[]

  @OneToMany(() => Role, (role) => role.group)
  declare roles: Role[]
}

export default UserGroup
