import { AuthTokenDto, JwtClaimsDto } from '@app/dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { User, UsersService } from '../users/users.service';

// TODO storage
let refreshTokens: string[] = [];

@Injectable()
export class AuthService {
  private storageFile = `${tmpdir()}/vue-nest-monorepo-auth.json`;

  constructor(
    private readonly users: UsersService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    if (existsSync(this.storageFile)) {
      refreshTokens = JSON.parse(readFileSync(this.storageFile, { encoding: 'utf8' }));
    }
  }

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
      refresh: await this.issueRefreshToken(payload),
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthTokenDto> {
    if (!refreshTokens.includes(refreshToken)) {
      throw new UnauthorizedException();
    }

    try {
      const { login, sub } = this.jwtService.verify<JwtClaimsDto>(refreshToken);

      // TODO consider issuing a new refresh token and invalidating the previous one

      return {
        access: this.jwtService.sign({ login, sub }),
        refresh: refreshToken,
      };
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnauthorizedException();
      }
      throw e;
    }
  }

  private async issueRefreshToken(payload: JwtClaimsDto): Promise<string> {
    const refresh = this.jwtService.sign(payload, {
      expiresIn: this.config.get('auth.refreshTokenLifetime'),
    });

    // TODO store in DB
    refreshTokens.push(refresh);
    writeFileSync(this.storageFile, JSON.stringify(refreshTokens));

    return refresh;
  }
}
