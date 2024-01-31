import { JsonController, Put } from 'routing-controllers'

@JsonController('/audio')
class AudioController {
  @Put('/upload')
  async upload() {}
}

export default AudioController
