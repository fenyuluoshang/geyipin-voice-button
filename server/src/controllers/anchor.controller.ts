import { HTTPResponseData } from '@/dtos'
import { AnchorDTO } from '@/dtos/anchor'
import { NotFoundError } from '@/errors'
import AnchorService from '@/services/anchor.services'
import { Get, JsonController, Param } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController('/anchor')
class AnchorController {
  @Inject()
  declare anchorService: AnchorService

  @Get('/:anchorPathName')
  async getAnchor(@Param('anchorPathName') anchorPathName: string) {
    const anchor = await this.anchorService.getAnchorInfo(anchorPathName)
    if (!anchor) {
      throw NotFoundError()
    }
    return HTTPResponseData.success(new AnchorDTO(anchor))
  }

  @Get('/:anchorPathName/voices')
  async getVoices(@Param('anchorPathName') anchorPathName: string) {
    const anchorWithVoices = await this.anchorService.getVoiceByAnchor(anchorPathName)
    if (!anchorWithVoices) {
      throw NotFoundError()
    }
    return HTTPResponseData.success(new AnchorDTO(anchorWithVoices))
  }

  @Get('/:anchorPathName/emoticons')
  async getEmotions(@Param('anchorPathName') anchorPathName: string) {
    const anchorWithEmoticons = await this.anchorService.getEmoticonsByAnchor(anchorPathName)
    if (!anchorWithEmoticons) {
      throw NotFoundError()
    }
    return HTTPResponseData.success(new AnchorDTO(anchorWithEmoticons))
  }
}

export default AnchorController
