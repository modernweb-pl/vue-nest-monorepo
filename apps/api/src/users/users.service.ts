import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) protected userModel: Model<UserDocument>) {}

  async findByLogin(login: string): Promise<User> {
    return this.userModel.findOne({ login });
  }
}
