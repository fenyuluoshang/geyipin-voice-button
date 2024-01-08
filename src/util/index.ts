export function getAudioUrl(path: string) {
  return `${import.meta.env.VITE_VOICE_PATH}${path}.MP3`
}

let audioCtx: AudioContext

/**
 * Fix change volume for AudioElement, volume is not work in ios safari
 * 
 * @param audio 
 * @param volume 
 */
export async function changeAudioVolumeFixed(audio: HTMLAudioElement, volume: number) {
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
