import type { InjectionKey } from 'vue'
import config from '../voice-mapping.json'

export const CONFIG_KEY: InjectionKey<typeof config> = Symbol('config')
