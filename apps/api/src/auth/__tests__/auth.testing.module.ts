import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'SecretForTestingPurposes',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthTestingModule {}
