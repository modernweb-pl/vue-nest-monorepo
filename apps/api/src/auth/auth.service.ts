import { AuthTokenDto, JwtClaimsDto } from '@app/dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService, private readonly jwtService: JwtService) {}

  async validate(login: string, password: string): Promise<User> {
    const user = await this.users.findOne(login);
    if (user && password === user.password) {
      return user;
    }

    return null;
  }

  async issueToken(user: User): Promise<AuthTokenDto> {
    const payload: JwtClaimsDto = { login: user.login, sub: user.id };
    return {
      access: this.jwtService.sign(payload),
    };
  }
}
