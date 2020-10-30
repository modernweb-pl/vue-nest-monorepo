import { Module } from '@nestjs/common';
import { UsersService } from '../users.service';
import { userModelMockProvider, usersServiceMockProvider } from './users.service.mock';

@Module({
  imports: [],
  providers: [userModelMockProvider, usersServiceMockProvider],
  exports: [UsersService],
})
export class UsersTestingModule {}
