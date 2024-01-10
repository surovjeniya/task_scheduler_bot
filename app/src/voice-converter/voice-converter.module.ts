import { Module } from '@nestjs/common';
import { VoiceConverterService } from './voice-converter.service';

@Module({
  providers: [VoiceConverterService],
  exports: [VoiceConverterService],
})
export class VoiceConverterModule {}
