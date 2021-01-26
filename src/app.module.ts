import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './controllers/user/user.module';
import { AuthModule } from './controllers/auth/auth.module';
import { connectionOptions } from 'config/ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
