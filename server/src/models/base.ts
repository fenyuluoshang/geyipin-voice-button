import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  declare id: number

  @CreateDateColumn()
  declare createAt: Date

  @UpdateDateColumn()
  declare updateAt: Date
}
