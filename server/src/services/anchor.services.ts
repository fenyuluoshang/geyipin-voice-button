import { AnchorCreateRequest, AnchorEditRequest } from '@/dtos/anchor'
import Anchor from '@/models/anchor.model'
import { Inject, Service } from 'typedi'
import { DataSource } from 'typeorm'

@Service()
class AnchorService {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource

  async getAnchorInfo(anchorPathName: string) {
    const anchor = await Anchor.findOneBy({ pathName: anchorPathName })
    return anchor
  }

  async getVoiceByAnchor(anchorPathName: string) {
    const anchor = await Anchor.findOne({
      where: { pathName: anchorPathName },
      relations: {
        voices: {
          tags: true
        }
      }
    })
    return anchor
  }

  async getEmoticonsByAnchor(anchorPathName: string) {
    const anchor = await Anchor.findOne({
      where: { pathName: anchorPathName },
      relations: {
        emoticons: {
          tags: true
        }
      }
    })
    return anchor
  }

  async create(anchor: AnchorCreateRequest) {
    const result = await this.AppDataSource.createQueryBuilder()
      .insert()
      .into(Anchor)
      .values({
        anchorName: anchor.anchorName,
        anchorTitle: anchor.anchorTitle,
        pathName: anchor.pathName,
        biliId: anchor.biliId,
        biliveId: anchor.biliveId,
        lastVideoBV: anchor.lastVideoBV,
        primaryColor: anchor.primaryColor,
        secondColor: anchor.secondColor,
        primaryColorDark: anchor.primaryColorDark,
        secondColorDark: anchor.secondColorDark,
        btnColor: anchor.btnColor
      })
      .execute()
    return result.identifiers[0].id as number
  }

  async edit(id: number, anchor: AnchorEditRequest) {
    const result = await this.AppDataSource.createQueryBuilder()
      .update(Anchor)
      .set({
        anchorName: anchor.anchorName,
        anchorTitle: anchor.anchorTitle,
        pathName: anchor.pathName,
        biliId: anchor.biliId,
        biliveId: anchor.biliveId,
        lastVideoBV: anchor.lastVideoBV,
        primaryColor: anchor.primaryColor,
        secondColor: anchor.secondColor,
        primaryColorDark: anchor.primaryColorDark,
        secondColorDark: anchor.secondColorDark,
        btnColor: anchor.btnColor
      })
      .whereInIds([id])
      .execute()
    return result.affected
  }

  async delete(id: number) {
    const result = await Anchor.delete({
      id
    })
    return result.affected === 1
  }
}

export default AnchorService
