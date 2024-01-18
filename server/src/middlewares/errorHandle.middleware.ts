import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers'
import { HttpResponseError } from '../errors'
import { HTTPResponseData } from '../dtos'

@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: any, request: any, response: any, next: (err: any) => any) {
    if (error instanceof HttpResponseError) {
      response.status(500).json(HTTPResponseData.error(error.code, error.message))

      return
    }

    next(error)
  }
}
