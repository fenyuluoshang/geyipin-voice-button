import { Get, JsonController } from 'routing-controllers'
import { HTTPResponseData } from '../dtos'
import { Inject } from 'typedi'
import FeatureFlagService from '@/services/ff.services'

@JsonController()
class PingController {
  @Inject()
  private declare ffService: FeatureFlagService

  @Get('/ping')
  async ping() {
    const testFF = await this.ffService.isOn('test')

    return HTTPResponseData.success({
      message: 'pong',
      ff_test: testFF
    })
  }
}

export default PingController
