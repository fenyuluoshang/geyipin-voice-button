import { Get, JsonController } from 'routing-controllers'
import { HTTPResponseData } from '../dtos'
import { FeatureFlag } from '@/decorators/ff.decorator'
import { envIsTrue } from '@/utils/env'

@JsonController()
class PingController {
  @Get('/ping')
  async ping(@FeatureFlag('test') testff: boolean) {
    return HTTPResponseData.success({
      message: 'pong',
      ff_test: testff,
      useSTS: envIsTrue('STS_UPLOAD'),
      mode: process.env.FILE_SAVE_MODE,
      useCapcha: envIsTrue('USE_CAPCHA'),
      sourceDomain: process.env.ALI_OSS_PUBLIC_DOMAIN
    })
  }
}

export default PingController
