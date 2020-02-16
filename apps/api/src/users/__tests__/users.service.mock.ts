import { Provider } from '@nestjs/common';
import { User, UsersService } from '../users.service';

export class UsersServiceMock extends UsersService {
  protected readonly users: User[] = [
    {
      id: 1,
      login: 'demo',
      password: 'demo',
    },
  ];

  async findOne(login: string): Promise<User | undefined> {
    return this.users.find(user => user.login === login);
  }
}

export const usersServiceMockProvider: Provider = {
  provide: UsersService,
  useClass: UsersServiceMock,
};
