import { RoleMatcher, UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData, PageDTO, PageRequestDTO } from '@/dtos'
import {
  EmoticonDTO,
  EmoticonFilter,
  EmoticonTagDTO,
  EmoticonTagRequest,
  UploadSTSRequest
} from '@/dtos/emoticon'
import { CreateTagRequest, GetTagsFilter } from '@/dtos/tags'
import User from '@/models/user.model'
import EmoticonsService from '@/services/emoticons.services'
import { RoleMatcherFn } from '@/utils/role_match'
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  QueryParams
} from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController('/emoticons')
class EmoticonsController {
  @Inject()
  private declare emoticonsServices: EmoticonsService

  @Put('/uploaded_sts')
  async uploadSts(@Body() body: UploadSTSRequest, @UserInject(true) user: User) {
    const data = await this.emoticonsServices.saveFile(
      {
        file: body.file,
        anchorId: body.anchor
      },
      user
    )
    return HTTPResponseData.success(new EmoticonDTO(data))
  }

  @Get('/tags')
  async getTags(
    @QueryParams() filter: GetTagsFilter,
    @QueryParams() page: PageRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    const data = await this.emoticonsServices.getTags(roleMatcher, filter, page)
    return HTTPResponseData.success(
      new PageDTO(
        data[1],
        data[0].map((item) => new EmoticonTagDTO(item))
      )
    )
  }

  @Post('/get_tags')
  async postGetTags(
    @Body() filter: GetTagsFilter,
    @Body() page: PageRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    const data = await this.emoticonsServices.getTags(roleMatcher, filter, page)
    return HTTPResponseData.success(data)
  }

  @Put('/tag')
  async putTag(@Body() body: CreateTagRequest, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    roleMatcher(`/anchor/${body.anchorId}/tag/create`)
    return HTTPResponseData.success(await this.emoticonsServices.createTag(body))
  }

  @Post('/list')
  async list(
    @Body() body: EmoticonFilter,
    @Body() page: PageRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    const data = await this.emoticonsServices.list(roleMatcher, body, page)
    return HTTPResponseData.success(
      new PageDTO(
        data[1],
        data[0].map((item) => new EmoticonDTO(item))
      )
    )
  }

  @Post('/tag/emoticons')
  async tagEmoticons(@Body() body: EmoticonTagRequest) {
    await this.emoticonsServices.updateTagEmoticons(body)
    return HTTPResponseData.success('ok')
  }

  @Delete('/tag/:id')
  async deleteTags(@Param('id') id: number, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    await this.emoticonsServices.deleteTags(id, roleMatcher)
    return HTTPResponseData.success('ok')
  }
}

export default EmoticonsController
