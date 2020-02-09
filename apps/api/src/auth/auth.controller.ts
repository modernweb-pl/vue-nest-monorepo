import { AuthTokenDto, UserDto } from '@app/dto';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth')
  async authenticate(@Request() req): Promise<AuthTokenDto> {
    return this.authService.issueToken(req.user);
  }

  @UseGuards(AuthGuard())
  @Get('me')
  async currentUser(@Request() req): Promise<UserDto> {
    return req.user;
  }
}
