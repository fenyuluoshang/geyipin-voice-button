import { Get, JsonController } from 'routing-controllers'
import { HTTPResponseData } from '../dtos'
import { FeatureFlag } from '@/decorators/ff.decorator'

@JsonController()
class PingController {
  @Get('/ping')
  async ping(@FeatureFlag('test') testff: boolean) {
    return HTTPResponseData.success({
      message: 'pong',
      ff_test: testff
    })
  }
}

export default PingController
