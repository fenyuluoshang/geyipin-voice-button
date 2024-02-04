import { Inject, Service } from 'typedi'
import AliShitDysmsapi, {
  SendSmsRequest as AliShitSendSmsRequest
} from '@alicloud/dysmsapi20170525'
import { Config as AliShitOpenApiConfig } from '@alicloud/openapi-client'
import { DataSource, MoreThan } from 'typeorm'
import PhoneEncode from '@/models/phone-encode.model'
import moment from 'moment-timezone'
import { LimitSendTimeInterval } from '@/errors/user'
import { rendomCode } from '@/utils/random'

class SMSConfigError extends Error {
  constructor(message: string) {
    super(`[SMS Config Error] detail:\n${message}`)
  }
}

@Service()
class SMSService {
  @Inject('AppDataSource')
  private declare AppDataSource: DataSource

  private async sendSMSCodeByAli(phone: string, code: string) {
    // ali的SDK弄得和屎一样难用，创建一个Client需要用好多从不同库来的不同的东西
    // what a shit that ali's sdk made, I need include many dependencies to make a simple client
    const config = new AliShitOpenApiConfig({
      accessKeyId: process.env.ALI_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALI_ACCESS_KEY_SECRET
    })
    // so what the fuck of this `endpoint` not in constructor ??? why ????
    config.endpoint = 'dysmsapi.aliyuncs.com'
    const client = new AliShitDysmsapi(config)

    // why I can't use new AliShitDysmsapi({xxx}) and client.sendSms({xxx}) What a shit design
    const fuckingSendSMSRequest = new AliShitSendSmsRequest({
      phoneNumbers: phone,
      signName: process.env.ALI_SMS_SIGN,
      templateCode: process.env.ALI_SMS_TEMPLATE_CODE,
      templateParam: JSON.stringify({
        [process.env.ALI_SMS_TEMPLATE_VAR_NAME || 'code']: code
      })
    })

    const result = await client.sendSms(fuckingSendSMSRequest)
    if (result.statusCode === 200) {
      return true
    }
    console.log(result)
    return false
  }

  async sendSMSVerifyCode(phone: string, code: string) {
    if (process.env.SMS_MODE === 'ali') {
      return this.sendSMSCodeByAli(phone, code)
    } else {
      throw new SMSConfigError('Not Allow SMS_MODE')
    }
  }

  async sendSMSVerifyCodeWithPhone(phone: string) {
    this.AppDataSource.transaction(async (transaction) => {
      let codes = await transaction.find(PhoneEncode, {
        where: {
          phone,
          hasUsed: false,
          createAt: MoreThan(moment().subtract(1, 'minutes').toDate())
        }
      })
      if (codes.length !== 0) {
        throw LimitSendTimeInterval()
      }
      codes = await transaction.find(PhoneEncode, {
        where: {
          phone,
          createAt: MoreThan(moment().startOf('day').toDate())
        }
      })
      if (codes.length >= 20) {
        throw LimitSendTimeInterval()
      }
      const code = rendomCode(6)
      await this.sendSMSVerifyCode(phone, code)
      transaction.insert(PhoneEncode, {
        phone,
        code: code,
        expirTime: moment().add(5, 'minute').toDate()
      })
    })
  }
}

export default SMSService
