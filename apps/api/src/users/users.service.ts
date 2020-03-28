import { Injectable } from '@nestjs/common';

// TODO domain + storage
export interface User {
  id: number;
  login: string;
  password: string;
}

@Injectable()
export class UsersService {
  protected readonly users: User[] = [
    {
      id: 1,
      login: 'demo',
      password: 'demo',
    },
  ];

  async findOne(login: string): Promise<User | undefined> {
    return this.users.find((user) => user.login === login);
  }
}
