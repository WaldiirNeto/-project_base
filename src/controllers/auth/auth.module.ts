
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@repository';
import { JwtStrategy } from 'controllers/auth/jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'super-secret',
    signOptions: {
      expiresIn: 18000,
    },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }
