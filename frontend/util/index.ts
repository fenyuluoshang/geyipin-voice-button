export function getAudioUrl(path: string) {
  const config = useRuntimeConfig()
  return `${config.public.SOURCE_PATH}${path}`
}

export function getMemsUrl(path: string) {
  const config = useRuntimeConfig()
  return `${config.public.SOURCE_PATH}${path}`
}

let audioCtx: AudioContext

/**
 * Fix change volume for AudioElement, volume is not work in ios safari
 *
 * @param audio
 * @param volume
 */
export function changeAudioVolumeFixed(audio: HTMLAudioElement, volume: number) {
  if (!audioCtx)
    // @ts-ignore
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  // @ts-ignore
  if (!audio.gainNode) {
    const source = audioCtx.createMediaElementSource(audio)
    const gainNode = audioCtx.createGain()
    source.connect(gainNode)
    gainNode.connect(audioCtx.destination)
    // @ts-ignore
    audio.gainNode = gainNode
  }

  // @ts-ignore
  audio.gainNode.gain.value = volume
}
