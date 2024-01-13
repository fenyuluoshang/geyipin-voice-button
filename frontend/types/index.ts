export type Voice = {
  group_name: string
  title: string
  file: string
}

export type Config = {
  low_voice_mode: number
  only_one_play_mode: boolean
  keyboard_binding_mode: boolean
  in_setting: boolean
  keyboard_binding_map: Record<string, {
    index: number,
    voice: Voice
  } | -1>
}