import { createSharedComposable, useDark } from "@vueuse/core";

const useSharedDark = createSharedComposable(useDark)

export default useSharedDark
