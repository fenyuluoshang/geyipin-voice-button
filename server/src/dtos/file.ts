import { IsIn } from 'class-validator'

export class FileSTSRequestParams {
  @IsIn(['voice', 'emotion', 'image'])
  declare type: string
}
