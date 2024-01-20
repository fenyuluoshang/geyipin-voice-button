import ExpressSession from 'express-session'
import { Request } from 'express'
import User from './models/user.model'
import { GrowthBook } from '@growthbook/growthbook'
import { RoleMatcher } from './utils/role_match'

declare module 'express-session' {
  interface SessionData {
    userId: number
  }
}

declare module 'express' {
  interface Request {
    user?: User
    growthbook: GrowthBook
    roleMatcher: RoleMatcher
  }
}

export type ExpressSession = Request['session']
