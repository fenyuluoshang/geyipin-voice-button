import { VoiceDTO } from "~/dtos/voice"


export type Config = {
  page_name: string
  low_voice_mode: number
  only_one_play_mode: boolean
  keyboard_binding_mode: boolean
  in_setting: boolean
  keyboard_binding_map: Record<string, {
    index: number,
    voice: VoiceDTO
  } | -1>
}