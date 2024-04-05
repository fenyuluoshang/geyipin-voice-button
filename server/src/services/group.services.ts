import { createGroupRequestDTO } from '@/dtos/user'
import UserGroup from '@/models/user-group.model'
import { mergeRoles } from '@/utils/role_match'
import { NotFoundError } from '@/errors'
import { Inject, Service } from 'typedi'
import { DataSource } from 'typeorm'

@Service()
class GroupServices {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource

  async createGroup(data: createGroupRequestDTO) {
    const group = UserGroup.create()
    group.title = data.title
    return group.save()
  }

  async updateGroupRole(id: number, roles: string[]) {
    return await this.AppDataSource.transaction(async (transaction) => {
      const group = await UserGroup.findOne({
        where: { id },
        relations: { roles: true },
        transaction: true
      })
      if (!group) {
        throw NotFoundError()
      }
      const mergeData = mergeRoles(group.roles, roles)
      await Promise.all([
        ...mergeData.add.map((item) => {
          item.group = group
          return transaction.save(item)
        }),
        ...mergeData.drop.map((item) => {
          return transaction.remove(item)
        })
      ])
    })
  }
}

export default GroupServices
