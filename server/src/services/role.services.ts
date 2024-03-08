import { NotFoundError } from '@/errors'
import Role from '@/models/role.model'
import UserGroup from '@/models/user-group.model'
import User from '@/models/user.model'
import { Inject, Service } from 'typedi'
import { DataSource } from 'typeorm'

@Service()
class RoleServices {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource

  private mergeRole(list: Role[], target: string[]) {
    const drop = [...list]
    const create: string[] = []
    target.forEach((item) => {
      const index = drop.findIndex((role) => role.roleStr === item)
      if (index === -1) {
        create.push(item)
      } else {
        drop.splice(index, 1)
      }
    })
    return {
      drop,
      create
    }
  }

  async editGroupRole(groupId: number, target: string[]) {
    await this.AppDataSource.transaction(async (transaction) => {
      const group = await transaction.findOne(UserGroup, {
        where: { id: groupId },
        relations: { roles: true }
      })
      if (!group) {
        throw NotFoundError()
      }
      const change = this.mergeRole(group.roles, target)
      await transaction
        .createQueryBuilder()
        .delete()
        .from(Role)
        .whereInIds(change.drop.map((item) => item.id))
        .execute()
      await transaction
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(
          change.create.map((item) => ({
            roleStr: item,
            groupId: groupId
          }))
        )
        .execute()
    })
  }

  async editUserRole(userId: number, target: string[]) {
    await this.AppDataSource.transaction(async (transaction) => {
      const user = await transaction.findOne(User, {
        where: { id: userId },
        relations: { roles: true }
      })
      if (!user) {
        throw NotFoundError()
      }
      const change = this.mergeRole(user.roles, target)
      await transaction
        .createQueryBuilder()
        .delete()
        .from(Role)
        .whereInIds(change.drop.map((item) => item.id))
        .execute()
      await transaction
        .createQueryBuilder()
        .insert()
        .into(Role)
        .values(
          change.create.map((item) => ({
            roleStr: item,
            userId: user.id
          }))
        )
        .execute()
    })
  }

  async removeRole(roleId: number) {
    await this.AppDataSource.createQueryBuilder().delete().whereInIds([roleId]).execute()
  }
}

export default RoleServices
