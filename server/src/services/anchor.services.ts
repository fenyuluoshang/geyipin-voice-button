import { AnchorCreateRequest, AnchorEditRequest } from '@/dtos/anchor'
import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import BliveCaptainModel from '@/models/bilive-captain.model'
import moment from 'moment-timezone'
import { Inject, Service } from 'typedi'
import { DataSource } from 'typeorm'

@Service()
class AnchorService {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource

  async getAllAnchor() {
    const anchor = await Anchor.find({
      select: ['anchorName', 'anchorTitle', 'pathName']
    })
    return anchor
  }

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

  private async getCaptainNumReq(anchor: Anchor): Promise<number> {
    const captainResp = await fetch(
      `https://api.live.bilibili.com/xlive/app-room/v2/guardTab/topList?roomid=${anchor?.biliveId}&page=1&page_size=3&ruid=${anchor?.biliId}`,
      {
        headers: {
          Accept: 'application/json, text/plain, */*',
          Origin: 'https://live.bilibili.com',
          Referer: 'https://live.bilibili.com',
          Connection: 'keep-alive',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
        }
      }
    )
    console.log('request captain')
    return (await captainResp.json())?.data?.info?.num || 0
  }

  async getCaptainNum(id: number) {
    const anchor = await Anchor.findOne({ where: { id }, relations: ['biliveCaptain'] })
    if (!anchor || !anchor.biliId || !anchor.biliveId) {
      throw NotFoundError()
    }
    if (
      !anchor.biliveCaptain ||
      (anchor.biliveCaptain.updateAt.getTime() || 0) <
        moment().subtract(2, 'second').toDate().getTime()
    ) {
      const biliveCaptain = new BliveCaptainModel()
      biliveCaptain.anchorId = anchor?.id
      biliveCaptain.sums = await this.getCaptainNumReq(anchor)
      await biliveCaptain.save()
      return biliveCaptain
    }
    return anchor.biliveCaptain
  }
}

export default AnchorService
