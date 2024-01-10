import { Command, Ctx, InlineQuery, Update } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf-context.interface';
import { CommandService } from './command.service';
import { WinstonLogger } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Update()
export class CommandUpdate {
  private logger: WinstonLogger;
  constructor(
    private readonly commandService: CommandService,
    private readonly configService: ConfigService,
  ) {
    this.logger = new WinstonLogger(
      this.configService.get('APP_SERVICE_CONTAINER_NAME'),
      this.configService,
    );
  }

  @Command('start')
  async startCommandHandler(@Ctx() ctx: TelegrafContext) {
    await this.commandService.validateUser(ctx.from);
  }
}
