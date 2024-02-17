import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from 'routing-controllers'
import { HttpResponseError } from '../errors'
import { HTTPResponseData } from '../dtos'
import { Response, Request } from 'express'

@Middleware({ type: 'after' })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(error: any, request: Request, response: Response) {
    if (error instanceof HttpResponseError) {
      response.status(200).json(HTTPResponseData.error(error.code, error.message))
      return
    }

    if (error instanceof HttpError) {
      response.status(error.httpCode).json({
        code: error.httpCode,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        errors: error.errors,
        message: error.message
      })
      return
    }

    console.error(error)
    response.status(500).json(HTTPResponseData.error(500, 'unknown error'))
  }
}
