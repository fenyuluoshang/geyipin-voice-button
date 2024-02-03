import { HTTPResponseData } from '@/dtos'
import { PlayRequestDTO } from '@/dtos/voice'
import AudioService from '@/services/audio.services'
import { Body, JsonController, Post, Put } from 'routing-controllers'
import { Inject } from 'typedi'

@JsonController('/audio')
class AudioController {
  @Inject()
  declare audioService: AudioService

  @Put('/upload')
  async upload() {}

  @Post('/play')
  async play(@Body() body: PlayRequestDTO) {
    const res = await this.audioService.play(body)
    return HTTPResponseData.success(res)
  }
}

export default AudioController
