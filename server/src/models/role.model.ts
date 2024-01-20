import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from './base'
import User from './user.model'
import UserGroup from './user-group.model'

@Entity()
class Role extends BaseModel {
  @Column()
  declare roleStr: string

  @ManyToOne(() => User, (user) => user.roles)
  declare user: User

  @ManyToOne(() => UserGroup, (group) => group.roles)
  declare group: UserGroup
}

export default Role
