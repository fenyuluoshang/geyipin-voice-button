/* eslint-disable @typescript-eslint/no-explicit-any */
export class HTTPResponseData<T = any> {
  declare code: number

  declare data: T

  declare message: string

  constructor(code: number, message: string, data?: T) {
    this.code = code
    this.message = message
    if (data) this.data = data
  }

  static success<T = any>(data: T) {
    return new HTTPResponseData<T>(1, 'ok', data)
  }

  static error<T = any>(code: number, message: string) {
    return new HTTPResponseData<T>(code, message)
  }
}
