import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
} from 'winston-elasticsearch';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const index = configService.get('APP_SERVICE_HOSTNAME_DEV');
        const elastic_host = configService.get(
          'ELASTICSEARCH_SERVICE_HOSTNAME',
        );
        const elastic_port = configService.get('ELASTICSEARCH_SERVICE_PORT');
        return {
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
          transports: [
            new winston.transports.Console(),
            new ElasticsearchTransport({
              // transformer: (logData) => ElasticsearchTransformer(logData),
              index,
              clientOpts: {
                node: `http://${elastic_host}:${elastic_port}`,
              },
            }),
          ],
        };
      },
    }),
  ],
})
export class LoggerModule {}
