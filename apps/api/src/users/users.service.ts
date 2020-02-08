import { Injectable } from '@nestjs/common';

// TODO domain + storage
export interface User {
  id: number;
  login: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      login: 'john',
      password: 'changeme',
    },
    {
      id: 2,
      login: 'chris',
      password: 'secret',
    },
    {
      id: 3,
      login: 'maria',
      password: 'guess',
    },
  ];

  async findOne(login: string): Promise<User | undefined> {
    return this.users.find(user => user.login === login);
  }
}
