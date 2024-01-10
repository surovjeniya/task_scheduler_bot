import { Injectable } from '@nestjs/common';

@Injectable()
export class VoiceConverterService {
  async convertVoiceToMp3(input: any) {
    // const convert = await ffmpeg()
    //   .input(input)
    //   .inputOption('-t 30')
    //   .output('./')
    //   .run();
  }
}
