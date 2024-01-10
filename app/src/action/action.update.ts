import { ConfigService } from '@nestjs/config';
import { On, Update } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf-context.interface';
import axios from 'axios';
import * as fs from 'fs';
import { VoiceConverterService } from 'src/voice-converter/voice-converter.service';

@Update()
export class ActionUpdate {
  constructor(
    private readonly configService: ConfigService,
    private readonly voiceConverterService: VoiceConverterService,
  ) {}
  //   @On('voice')
  //   async voiceActionHandler(ctx: TelegrafContext) {
  //     console.log(ctx);
  //   }

  @On('message')
  async messageActionHandler(ctx: TelegrafContext) {
    const message = ctx.update.message;
    if (ctx.session.action === 'create_task') {
      if (message.voice) {
        const fileName = `${message.voice.file_id}.ogg`;
        const writeStream = fs.createWriteStream(fileName);
        const url = await ctx.telegram.getFileLink(message.voice.file_id);
        const voiceFile = await axios.get(url.href, {
          responseType: 'stream',
        });
      }
    }
  }
}
