import { Command, Ctx, Update } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf-context.interface';
import { CommandService } from './command.service';
import { LoggerService } from '@app/common';

@Update()
export class CommandUpdate {
  constructor(
    private readonly commandService: CommandService,
    private readonly loggerService: LoggerService,
  ) {}

  @Command('start')
  async startCommandHandler(@Ctx() ctx: TelegrafContext) {
    ctx.session.action = null;

    this.loggerService.setCommand('START').info('start command');
    await this.commandService.validateUser(ctx.from);
  }
}
