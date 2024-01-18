import { Column, Entity } from 'typeorm'
import { BaseModel } from './base'

@Entity()
class Anchor extends BaseModel {
  @Column()
  declare anchorName: string

  @Column()
  declare anchorTitle: string

  @Column({ nullable: true })
  declare biliId: number

  @Column({ nullable: true })
  declare biliveId: number

  @Column({ nullable: true })
  declare lastVideoBV: string

  @Column({ nullable: true })
  declare primaryColor: string

  @Column({ nullable: true })
  declare secondColor: string

  @Column({ nullable: true })
  declare primaryColorDark: string

  @Column({ nullable: true })
  declare secondColorDark: string

  @Column({ nullable: true })
  declare btnColor: string
}

export default Anchor
