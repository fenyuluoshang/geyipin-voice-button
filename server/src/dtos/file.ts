import { IsIn } from 'class-validator'

export class FileSTSRequestParams {
  @IsIn(['voice', 'emoticon', 'image'])
  declare type: string
}
