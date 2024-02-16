import { Service } from 'typedi'
import AliCaptcha, {
  VerifyCaptchaRequest as AliShitVerifyCaptchaRequest
} from '@alicloud/captcha20230305'
import { getAliCloudOpenApiConfig } from '@/utils/ali-openapi'

@Service()
class CaptchaService {
  async aliCapchaVerify(captchaVerifyParam: string) {
    const config = getAliCloudOpenApiConfig({
      endpoint: 'captcha.cn-shanghai.aliyuncs.com',
      connectTimeout: 5000,
      readTimeout: 5000
    })

    // why I can't use new AliCaptcha({xxx}), also a shit design just like sms
    const aliClient = new AliCaptcha(config)
    // ohhh shit, again
    const request = new AliShitVerifyCaptchaRequest({
      captchaVerifyParam
    })
    try {
      const resp = await aliClient.verifyCaptcha(request)
      return resp?.body?.result?.verifyResult ?? true
    } catch (error) {
      return true
    }
  }
}

export default CaptchaService
