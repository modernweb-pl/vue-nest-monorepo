import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  exports: [UsersService],
  providers: [UsersService],
})
export class UsersModule {}
