import { DataBaseModule, LoggerModule, LoggerService } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TelegrafModule } from 'nestjs-telegraf';
import { Redis } from '@telegraf/session/redis';
import { getRedisConfig } from './config/redis.config';
import { session } from 'telegraf';
import { UserModule } from './user/user.module';
import { CommandModule } from './command/command.module';
import { ActionModule } from './action/action.module';
import { VoiceConverterModule } from './voice-converter/voice-converter.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DB_SERVICE_DB: Joi.string().required(),
        DB_SERVICE_USER: Joi.string().required(),
        DB_SERVICE_PASSWORD: Joi.string().required(),
        DB_SERVICE_HOSTNAME: Joi.string().required(),
        DB_SERVICE_PORT: Joi.number().required(),
        APP_SERVICE_PORT: Joi.number().required(),
        APP_SERVICE_HOSTNAME_DEV: Joi.string().required(),
        APP_SERVICE_HOSTNAME_PROD: Joi.string().required(),
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
        CACHE_SERVICE_PASSWORD: Joi.string().required(),
        CACHE_SERVICE_HOSTNAME: Joi.string().required(),
        CACHE_SERVICE_PORT: Joi.number().required(),
        ELASTICSEARCH_SERVICE_HOSTNAME: Joi.string().required(),
        ELASTICSEARCH_SERVICE_PORT: Joi.number().required(),
      }),
    }),
    DataBaseModule,
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('TELEGRAM_BOT_TOKEN'),
        middlewares: [
          session({
            store: Redis({
              url: getRedisConfig(
                configService.get('CACHE_SERVICE_PASSWORD'),
                configService.get('CACHE_SERVICE_HOSTNAME'),
                configService.get('CACHE_SERVICE_PORT'),
              ),
            }),
          }),
        ],
      }),
    }),
    UserModule,
    CommandModule,
    ActionModule,
    VoiceConverterModule,
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
