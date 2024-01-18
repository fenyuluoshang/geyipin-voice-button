import { multi } from 'itertools-ts'
import { getMetadataArgsStorage } from 'routing-controllers'
import Container from 'typedi'

export function containerRegister() {
  const allNeedRegister = multi.chain(
    // eslint-disable-next-line @typescript-eslint/ban-types
    getMetadataArgsStorage().controllers as { target: Function }[],
    getMetadataArgsStorage().middlewares,
    getMetadataArgsStorage().interceptors
  )

  for (const { target } of allNeedRegister) {
    if (!Container.has(target)) {
      Container.set({
        id: target,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: target as new () => any
      })
    }
  }
}
