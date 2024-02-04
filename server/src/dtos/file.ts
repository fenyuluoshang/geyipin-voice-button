import { IsIn } from 'class-validator'

export class FileSTSRequestParams {
  @IsIn(['audio', 'emotion', 'image'])
  declare type: string
}
