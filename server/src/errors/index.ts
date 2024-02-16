export class HttpResponseError extends Error {
  declare code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.message = message
  }
}

export function errorCreater(code: number, message: string) {
  return () => new HttpResponseError(code, message)
}

export const NotFoundError = errorCreater(4001, 'Not Found Resource')

export const NoPermissionError = errorCreater(4002, 'No Permission')

export const WrongUserOrPasswordError = errorCreater(10001, 'wrong user or password')
export const WrongCaptachError = errorCreater(10002, 'wrong captach error')
