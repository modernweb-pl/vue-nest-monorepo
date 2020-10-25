import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthJwtStrategy } from './jwt.strategy';
import { AuthLocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        secret: config.get('auth.secret'),
        signOptions: { expiresIn: config.get('auth.tokenLifetime') },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthLocalStrategy, AuthJwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
