import { RoleMatcher, UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData, PageDTO, PageRequestDTO } from '@/dtos'
import { CreateTagRequest, GetTagsFilter } from '@/dtos/tags'
import {
  PlayRequestDTO,
  UploadSTSRequest,
  VoiceDTO,
  VoiceFilter,
  VoiceTagDTO,
  VoiceTagRequest
} from '@/dtos/voice'
import User from '@/models/user.model'
import VoiceService from '@/services/voice.services'
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

@JsonController('/voice')
class VoiceController {
  @Inject()
  declare voiceService: VoiceService

  @Put('/upload')
  async upload() {}

  @Put('/uploaded_sts')
  async uploadSts(@Body() body: UploadSTSRequest, @UserInject(true) user: User) {
    const data = await this.voiceService.saveFile(
      {
        title: body.title,
        file: body.file,
        anchorId: body.anchor
      },
      user
    )
    return HTTPResponseData.success(new VoiceDTO(data))
  }

  @Post('/play')
  async play(@Body() body: PlayRequestDTO) {
    const res = await this.voiceService.play(body)
    return HTTPResponseData.success(res)
  }

  @Get('/tags')
  async getTags(
    @QueryParams() filter: GetTagsFilter,
    @QueryParams() page: PageRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    const data = await this.voiceService.getTags(roleMatcher, filter, page)
    return HTTPResponseData.success(
      new PageDTO(
        data[1],
        data[0].map((item) => new VoiceTagDTO(item))
      )
    )
  }

  @Post('/get_tags')
  async postGetTags(
    @Body() filter: GetTagsFilter,
    @Body() page: PageRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    const data = await this.voiceService.getTags(roleMatcher, filter, page)
    return HTTPResponseData.success(data)
  }

  @Put('/tag')
  async putTag(@Body() body: CreateTagRequest, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    roleMatcher(`/anchor/${body.anchorId}/tag/create`)
    return HTTPResponseData.success(await this.voiceService.createTag(body))
  }

  @Post('/list')
  async list(
    @Body() body: VoiceFilter,
    @Body() page: PageRequestDTO,
    @RoleMatcher() roleMatcher: RoleMatcherFn
  ) {
    const data = await this.voiceService.list(roleMatcher, body, page)
    return HTTPResponseData.success(
      new PageDTO(
        data[1],
        data[0].map((item) => new VoiceDTO(item))
      )
    )
  }

  @Post('/tag/voices')
  async tagVoices(@Body() body: VoiceTagRequest) {
    await this.voiceService.updateTagVoices(body)
    return HTTPResponseData.success('ok')
  }

  @Delete('/tag/:id')
  async deleteTags(@Param('id') id: number, @RoleMatcher() roleMatcher: RoleMatcherFn) {
    await this.voiceService.deleteTags(id, roleMatcher)
    return HTTPResponseData.success('ok')
  }
}

export default VoiceController
