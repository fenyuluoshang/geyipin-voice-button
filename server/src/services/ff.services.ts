import { Inject, Service } from 'typedi'
import type { GrowthBook } from '@growthbook/growthbook'

@Service()
class FeatureFlagService {
  @Inject('growthbook')
  private declare growthbook?: GrowthBook

  @Inject('enable-growthbook')
  private declare enableGrowthBook: boolean

  async isOn(ff: string) {
    if (!this.enableGrowthBook) {
      return true
    }
    return await this.growthbook!.isOn(ff)
  }

  async isOff(ff: string) {
    if (!this.enableGrowthBook) {
      return false
    }
    return await this.growthbook!.isOff(ff)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getFeatureValue<V = any>(ff: string, defaultValue: V) {
    if (!this.enableGrowthBook) {
      return defaultValue
    }
    return await this.growthbook!.getFeatureValue(ff, defaultValue)
  }
}

export default FeatureFlagService
