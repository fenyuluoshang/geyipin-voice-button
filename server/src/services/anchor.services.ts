import { AnchorCreateRequest, AnchorEditRequest } from '@/dtos/anchor'
import { NotFoundError } from '@/errors'
import Anchor from '@/models/anchor.model'
import BliveCaptainModel from '@/models/bilive-captain.model'
import { UploadStatus } from '@/models/upload.base'
import moment from 'moment-timezone'
import { Inject, Service } from 'typedi'
import { DataSource, IsNull } from 'typeorm'

@Service()
class AnchorService {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource

  async getAllAnchor() {
    const anchor = await Anchor.find({
      select: ['id', 'anchorName', 'anchorTitle', 'pathName', 'biliId']
    })
    return anchor
  }

  async getAnchorInfo(anchorPathName: string) {
    const anchor = await Anchor.findOneBy({ pathName: anchorPathName })
    return anchor
  }

  async getVoiceByAnchor(anchorPathName: string) {
    const anchor = await Anchor.findOne({
      where: {
        pathName: anchorPathName,
        voiceTags: {
          voices: [
            {
              status: UploadStatus.ALLOW
            },
            { id: IsNull() }
          ]
        }
      },
      relations: {
        voiceTags: {
          voices: true
        }
      }
    })
    return anchor
  }

  async getEmoticonsByAnchor(anchorPathName: string) {
    const anchor = await Anchor.findOne({
      where: {
        pathName: anchorPathName,
        emoticons: {
          status: UploadStatus.ALLOW
        }
      },
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
          Host: 'live.bilibili.com',
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
    return (await captainResp.json())?.data?.info?.num || 0
  }

  async getCaptainNum(id: number, live: boolean) {
    const anchor = await Anchor.findOne({ where: { id }, relations: ['biliveCaptain'] })
    if (!anchor || !anchor.biliId || !anchor.biliveId) {
      throw NotFoundError()
    }
    const expTime = live ? moment().subtract(2, 'second') : moment().subtract(1, 'minute')
    if (
      !anchor.biliveCaptain ||
      (anchor.biliveCaptain.updateAt.getTime() || 0) < expTime.toDate().getTime()
    ) {
      const biliveCaptain = anchor.biliveCaptain || new BliveCaptainModel()
      biliveCaptain.anchorId = anchor?.id
      biliveCaptain.sums = await this.getCaptainNumReq(anchor)
      biliveCaptain.updateAt = new Date()
      await biliveCaptain.save()
      return biliveCaptain
    }
    return anchor.biliveCaptain
  }
}

export default AnchorService
