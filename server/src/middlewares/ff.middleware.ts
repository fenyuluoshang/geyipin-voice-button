import { setPolyfills } from '@growthbook/growthbook'
import { Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { loadGrowthBook } from '@/utils/growthbook'
import { envIsTrue } from '@/utils/env'

setPolyfills({
  // Optional, can make feature rollouts faster
  EventSource: require('eventsource')
})

@Middleware({ type: 'before' })
export class GrowthBookHandle implements ExpressMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async use(request: Request, response: Response, next: (err?: any) => any) {
    if (envIsTrue('USE_GROWTHBOOK')) {
      request.growthbook = await loadGrowthBook({
        id: request.user?.id,
        loggedIn: !!request.user,
        ip: request.headers['X-Real-IP'] || request.ip
      })
    }

    next()
  }
}
