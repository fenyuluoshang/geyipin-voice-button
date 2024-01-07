
export function getAudioUrl(path: string){
  return `${import.meta.env.VITE_VOICE_PATH}${path}.MP3`
}