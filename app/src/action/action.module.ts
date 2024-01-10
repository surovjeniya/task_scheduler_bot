import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionUpdate } from './action.update';
import { VoiceConverterModule } from 'src/voice-converter/voice-converter.module';

@Module({
  imports: [VoiceConverterModule],
  providers: [ActionService, ActionUpdate],
})
export class ActionModule {}
