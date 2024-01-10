import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get('APP_SERVICE_PORT'));
  const logger = app.get(LoggerService);
  logger.info(
    `server has been started on port: ${configService.get('APP_SERVICE_PORT')}`,
  );
}
bootstrap();
