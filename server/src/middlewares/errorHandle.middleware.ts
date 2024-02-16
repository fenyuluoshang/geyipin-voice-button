import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers'
import { HttpResponseError } from '../errors'
import { HTTPResponseData } from '../dtos'

@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: any, request: any, response: any) {
    if (error instanceof HttpResponseError) {
      response.status(200).json(HTTPResponseData.error(error.code, error.message))
      return
    }

    console.log('error', error)

    if (error instanceof HttpError) {
      response.status(error.httpCode).json(error)
    }

    console.error(error)
    response.status(500).json(HTTPResponseData.error(500, 'unknown error'))
  }
}
