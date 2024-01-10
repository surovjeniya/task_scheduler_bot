import { Logger } from 'winston';
import { ILogData, ILogger, LogLevel } from './interface/logger.interface';
import * as winston from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { utilities } from 'nest-winston';
import { ConfigService } from '@nestjs/config';

export class WinstonLogger implements ILogger {
  private logger: Logger;
  constructor(
    private index: string,
    private configService: ConfigService,
  ) {
    const elastic_host = this.configService.get(
      'ELASTICSEARCH_SERVICE_HOSTNAME',
    );
    const elastic_port = this.configService.get('ELASTICSEARCH_SERVICE_PORT');

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            utilities.format.nestLike(this.index, {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
        new ElasticsearchTransport({
          index: this.index,
          clientOpts: {
            node: `http://${elastic_host}:${elastic_port}`,
          },
        }),
      ],
    });
  }

  log(level: LogLevel, message: string | Error, data?: ILogData): void {
    this.logger.log(level, message);
  }
  debug(message: string, data?: ILogData): void {
    this.log(LogLevel.Debug, message);
  }
  info(message: string, data?: ILogData): void {
    this.log(LogLevel.Info, message);
  }
  warn(message: string | Error, data?: ILogData): void {
    this.log(LogLevel.Debug, message);
  }
  error(message: string | Error, data?: ILogData): void {
    this.log(LogLevel.Debug, message);
  }
  fatal(message: string | Error, data?: ILogData): void {
    this.log(LogLevel.Debug, message);
  }
  emergency(message: string | Error, data?: ILogData): void {
    this.log(LogLevel.Debug, message);
  }
}
