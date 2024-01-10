import { Module } from '@nestjs/common';
import { CommandUpdate } from './command.update';
import { UserModule } from 'src/user/user.module';
import { CommandService } from './command.service';
import { LoggerService } from '@app/common';

@Module({
  imports: [UserModule],
  providers: [CommandUpdate, CommandService, LoggerService],
  exports: [],
})
export class CommandModule {}
