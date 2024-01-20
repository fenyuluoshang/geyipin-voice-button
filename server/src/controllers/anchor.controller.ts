import { RoleMatcher } from '@/decorators/user.decorator'
import { HTTPResponseData } from '@/dtos'
import { AnchorCreateRequest, AnchorDTO, AnchorEditRequest } from '@/dtos/anchor'
import { NotFoundError } from '@/errors'
import AnchorService from '@/services/anchor.services'
import { RoleMatcherFn } from '@/utils/role_match'
import { Body, Get, JsonController, Param, Post, Put } from 'routing-controllers'
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

  @Put('/')
  async create(@RoleMatcher() roleMatcher: RoleMatcherFn, @Body() body: AnchorCreateRequest) {
    roleMatcher('/anchor/create')
    const result = await this.anchorService.create(body)
    return HTTPResponseData.success(result)
  }

  @Post('/:anchorID')
  async edit(
    @Param('anchorID') anchorID: number,
    @RoleMatcher() roleMatcher: RoleMatcherFn,
    @Body() body: AnchorEditRequest
  ) {
    roleMatcher(`/anchor/${anchorID}/edit`)
    const result = await this.anchorService.edit(anchorID, body)
    if (!result) {
      throw NotFoundError()
    }
    return HTTPResponseData.success(result)
  }
}

export default AnchorController
