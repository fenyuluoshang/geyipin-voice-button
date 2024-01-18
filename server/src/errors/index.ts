export class HttpResponseError extends Error {
  declare code: number
  constructor(code: number, message: string) {
    super(message)
    this.code = code
    this.message = message
  }
}

function errorCreater(code: number, message: string) {
  return () => new HttpResponseError(code, message)
}

export const NotFoundError = errorCreater(4001, 'Not Found Resource')

export const WrongUserOrPasswordError = errorCreater(10001, 'wrong user or password')
