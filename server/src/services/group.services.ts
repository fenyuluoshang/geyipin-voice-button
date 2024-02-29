import { CreateGroupRequestDTO, EditGroupRequestDTO } from '@/dtos/user'
import { NotFoundError } from '@/errors'
import Role from '@/models/role.model'
import UserGroup from '@/models/user-group.model'
import User from '@/models/user.model'
import { Service } from 'typedi'

@Service()
class GroupServices {
  async list() {
    return UserGroup.find({
      relations: {
        users: {
          roles: true
        },
        roles: true
      }
    })
  }

  async create(data: CreateGroupRequestDTO) {
    const group = new UserGroup()
    group.title = data.title
    return group.save()
  }

  async edit(id: number, data: EditGroupRequestDTO) {
    const group = await UserGroup.findOneBy({ id })
    if (!group) {
      throw NotFoundError()
    }
    group.title = data.title
    return group.save()
  }

  async delete(id: number) {
    const group = await UserGroup.findOneBy({ id })
    if (!group) {
      throw NotFoundError()
    }
    await Promise.all([
      User.update(
        { groupId: group.id },
        {
          groupId: 2
        }
      ),
      Role.delete({ groupId: group.id })
    ])

    return await group.remove()
  }
}

export default GroupServices
