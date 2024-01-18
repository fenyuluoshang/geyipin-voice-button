import ExpressSession from 'express-session'
import { Request } from 'express'

declare module 'express-session' {
  interface SessionData {
    userId: number
  }
}

export type ExpressSession = Request['session']
