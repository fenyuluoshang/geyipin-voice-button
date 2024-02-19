import { errorCreater } from '.'

export const FileConfigError = errorCreater(20001, 'File Config Error')

export const NotAllowSTS = errorCreater(20002, 'Not Allow STS Upload')

export const FileNotExitError = errorCreater(20003, 'File Not Exits')
