import { Get, JsonController } from 'routing-controllers'
import { HTTPResponseData } from '../dtos'

@JsonController()
class PingController {
  @Get('/ping')
  async ping() {
    return HTTPResponseData.success('pong')
  }
}

export default PingController
