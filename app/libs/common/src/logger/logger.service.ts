import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

export interface LoggerMetaInterface {
  tag?: 'TAG1' | 'TAG2';
  command?: 'START' | 'MENU';
}

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  info(data: any) {
    return this.logger.info(
      typeof data === 'object' ? JSON.stringify(data) : data,
    );
  }

  error(data: any) {
    return this.logger.error(JSON.stringify(data));
  }

  setTag(tag: 'TAG1' | 'TAG2') {
    this.logger.defaultMeta = { ...this.logger.defaultMeta, tag };
    return this;
  }

  setCommand(command: 'START' | 'MENU') {
    this.logger.defaultMeta = { ...this.logger.defaultMeta, command };
    return this;
  }
}
