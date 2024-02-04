import { errorCreater } from '.'

export const LimitSendTimeInterval = errorCreater(
  30011,
  'Only one code allow in 1min with same phone'
)

export const LimitSendTimeInOneDay = errorCreater(
  30011,
  'Only 20 codes allow in one day with same phone, please try after tommorrow 00:00(UTC+8)'
)

export const EncodeVerifyFailed = errorCreater(30001, 'Encode Verify Failed')
