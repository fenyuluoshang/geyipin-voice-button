import { UserInject } from '@/decorators/user.decorator'
import { HTTPResponseData } from '@/dtos'
import { EmoticonDTO, UploadSTSRequest } from '@/dtos/emoticon'
import User from '@/models/user.model'
import EmoticonsService from '@/services/emoticons.services'
import { Body, JsonController, Put } from 'routing-controllers'
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
}

export default EmoticonsController
