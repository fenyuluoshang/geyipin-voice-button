import { Column, ManyToOne } from 'typeorm'
import { BaseModel } from './index.base'
import User from './user.model'

export enum UploadStatus {
  PENDING = 0,
  NOT_ALLOW = 2,
  ALLOW = 1
}

export class UploadModel extends BaseModel {
  @ManyToOne(() => User, { nullable: true })
  declare uploader: User

  @Column({ nullable: true })
  declare uploaderId: number

  @Column({
    type: 'simple-enum',
    enum: UploadStatus,
    default: UploadStatus.PENDING
  })
  declare status: UploadStatus
}
