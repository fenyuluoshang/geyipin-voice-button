import { UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData } from '@/dtos'
import { PlayRequestDTO, UploadSTSRequest, VoiceDTO } from '@/dtos/voice'
import User from '@/models/user.model'
import VoiceService from '@/services/voice.services'
import { Body, JsonController, Post, Put } from 'routing-controllers'
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
}

export default VoiceController
