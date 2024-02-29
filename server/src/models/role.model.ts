import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseModel } from './index.base'
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

  @Column()
  declare userId: number

  @Column()
  declare groupId: number
}

export default Role
