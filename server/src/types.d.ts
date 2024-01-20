import ExpressSession from 'express-session'
import { Request } from 'express'
import User from './models/user.model'
import { GrowthBook } from '@growthbook/growthbook'

declare module 'express-session' {
  interface SessionData {
    userId: number
  }
}

export type ExpressSession = Request['session']

declare module 'express' {
  interface Request {
    user?: User
    growthbook: GrowthBook
  }
}
