import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('DB_SERVICE_DB'),
        username: configService.get('DB_SERVICE_USER'),
        password: configService.get('DB_SERVICE_PASSWORD'),
        port: configService.get('DB_SERVICE_PORT'),
        host: configService.get('DB_SERVICE_HOSTNAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DataBaseModule {}
