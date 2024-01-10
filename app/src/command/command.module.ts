import { Module } from '@nestjs/common';
import { CommandUpdate } from './command.update';
import { UserModule } from 'src/user/user.module';
import { CommandService } from './command.service';

@Module({
  imports: [UserModule],
  providers: [CommandUpdate, CommandService],
  exports: [],
})
export class CommandModule {}
