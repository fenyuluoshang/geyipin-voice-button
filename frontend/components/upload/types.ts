import { InjectionKey } from 'vue'

export const UPLOAD_PROVIDE_KEY = Symbol('upload_config') as InjectionKey<
  () => {
    useSTS: boolean
    mode: 'ali'
  }
>

export const HAS_LOGIN = Symbol('has_login') as InjectionKey<
  () => boolean
>

export const REFRESH_HAS_LOGIN = Symbol('refresh_has_login') as InjectionKey<
  () => any
>
