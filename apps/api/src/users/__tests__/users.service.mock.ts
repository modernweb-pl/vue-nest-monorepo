import { Provider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { UsersService } from '../users.service';

export class UsersServiceMock extends UsersService {
  protected readonly users: User[] = [
    {
      id: '1',
      login: 'demo',
      password: 'demo',
    },
    {
      id: '2',
      login: 'john',
      password: 'doe',
    },
  ];

  async findByLogin(login: string): Promise<User> {
    return this.users.find((user) => user.login === login);
  }
}

export const usersServiceMockProvider: Provider = {
  provide: UsersService,
  useClass: UsersServiceMock,
};

export const userModelMockProvider: Provider = {
  provide: getModelToken(User.name),
  useValue: {},
};
