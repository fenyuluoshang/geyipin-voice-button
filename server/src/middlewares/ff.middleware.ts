import { setPolyfills } from '@growthbook/growthbook'
import fetch from 'cross-fetch'
import crypto from 'node:crypto'
import { Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'
import { loadGrowthBook } from '@/utils/growthbook'

setPolyfills({
  // Required when using built-in feature loading and Node 17 or lower
  fetch: fetch,
  // Required when using encrypted feature flags and Node 18 or lower
  SubtleCrypto: crypto.webcrypto.subtle,
  // Optional, can make feature rollouts faster
  EventSource: require('eventsource')
})

@Middleware({ type: 'before' })
export class GrowthBookHandle implements ExpressMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async use(request: Request, response: Response, next: (err?: any) => any) {
    if (process.env.USE_GROWTHBOOK === 'true') {
      request.growthbook = await loadGrowthBook({
        id: request.user?.id,
        loggedIn: !!request.user,
        ip: request.headers['X-Real-IP'] || request.ip
      })
    }

    next()
  }
}
