import { AuthRefreshRequestDto, AuthTokenDto, UserDto } from '@app/dto';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth')
  async authenticate(@Req() req): Promise<AuthTokenDto> {
    return this.authService.issueToken(req.user);
  }

  @Post('auth/refresh')
  async refresh(@Req() req: Request): Promise<AuthTokenDto> {
    const body: AuthRefreshRequestDto = req.body;
    return this.authService.refreshAccessToken(body.refreshToken);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async currentUser(@Req() req): Promise<UserDto> {
    return req.user;
  }
}
