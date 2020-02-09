import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { User } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
    } as IStrategyOptions);
  }

  async validate(login: string, password: string): Promise<User> {
    const user = await this.authService.validate(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
