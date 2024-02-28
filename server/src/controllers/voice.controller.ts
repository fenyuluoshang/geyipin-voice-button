import { UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData, PageRequestDTO } from '@/dtos'
import { GetTagsFilter } from '@/dtos/tags'
import { PlayRequestDTO, UploadSTSRequest, VoiceDTO } from '@/dtos/voice'
import User from '@/models/user.model'
import VoiceService from '@/services/voice.services'
import { Body, Get, JsonController, Post, Put, QueryParams } from 'routing-controllers'
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
  async getTags(@QueryParams() filter: GetTagsFilter, @QueryParams() page: PageRequestDTO) {
    const data = await this.voiceService.getTags(filter, page)
    return HTTPResponseData.success(data)
  }

  @Post('/get_tags')
  async postGetTags(@Body() filter: GetTagsFilter, @Body() page: PageRequestDTO) {
    const data = await this.voiceService.getTags(filter, page)
    return HTTPResponseData.success(data)
  }
}

export default VoiceController
