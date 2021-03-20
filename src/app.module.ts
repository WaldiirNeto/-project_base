import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { connectionOptions } from 'config/orm.config';
import { WinstonModule } from 'nest-winston';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from 'interceptors/logger.interceptor';
import { winstonConfig } from '@config';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    WinstonModule.forRoot(winstonConfig),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule { }
