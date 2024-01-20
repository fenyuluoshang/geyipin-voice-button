import { GrowthBook as GrowthBookSDK } from '@growthbook/growthbook'
import { createParamDecorator } from 'routing-controllers'

export function GrowthBook() {
  return createParamDecorator({
    required: false,
    value: (action) => {
      return action.request.growthbook as GrowthBookSDK
    }
  })
}

export function FeatureFlag(ff: string, defaultValue = true) {
  return createParamDecorator({
    required: false,
    value: async (action) => {
      if (process.env.USE_GROWTHBOOK !== 'true') {
        return defaultValue
      }
      const client = action.request.growthbook as GrowthBookSDK
      return client.isOn(ff)
    }
  })
}

export function FeatureFlags(ff: string[], defaultValue = true) {
  return createParamDecorator({
    required: false,
    value: async (action) => {
      if (process.env.USE_GROWTHBOOK !== 'true') {
        return ff.map(() => defaultValue)
      }
      const client = action.request.growthbook as GrowthBookSDK
      return Promise.all(ff.map((item) => client.isOn(item)))
    }
  })
}

export function FeatureFlagValue<T>(ff: string, defaultValue: T) {
  return createParamDecorator({
    required: false,
    value: async (action) => {
      if (process.env.USE_GROWTHBOOK !== 'true') {
        return defaultValue
      }
      const client = action.request.growthbook as GrowthBookSDK
      return client.getFeatureValue(ff, defaultValue)
    }
  })
}
