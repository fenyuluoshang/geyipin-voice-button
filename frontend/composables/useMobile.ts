import { createSharedComposable, useMediaQuery } from '@vueuse/core'

function useSharedMedisQueryMaxMD() {
  return useMediaQuery('(max-width: 768px)')
}

const useMobile = createSharedComposable(useSharedMedisQueryMaxMD)

export default useMobile
