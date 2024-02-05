import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseModel } from './index.base'
import Anchor from './anchor.model'

@Entity()
class BliveCaptainModel extends BaseModel {
  @JoinColumn()
  @OneToOne(() => Anchor)
  declare anchor: Anchor

  @Column()
  declare anchorId: number

  @Column({ default: 0 })
  declare sums: number
}

export default BliveCaptainModel
