import { GrowthBook, type Attributes } from '@growthbook/growthbook'

export async function loadGrowthBook(attributes?: Attributes) {
  const growthbook = new GrowthBook({
    attributes,
    apiHost: process.env.GROWTHBOOK_HOST,
    clientKey: process.env.GROWTHBOOK_CLIENT_KEY,
    enableDevMode: true,
    subscribeToChanges: true,
    trackingCallback: (experiment, result) => {
      // TODO: Use your real analytics tracking system
      console.log('Viewed Experiment', {
        experimentId: experiment.key,
        variationId: result.key
      })
    }
  })

  await growthbook.loadFeatures()

  return growthbook
}
