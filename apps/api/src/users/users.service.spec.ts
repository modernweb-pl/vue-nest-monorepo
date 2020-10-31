import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User } from './schema';
import { UserDocument } from './schema/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let UserModel: Partial<Model<UserDocument>>;

  beforeEach(async () => {
    UserModel = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: UserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByLogin', async () => {
    await service.findByLogin('john').then(() => {
      expect(UserModel.findOne).toBeCalledWith({ login: 'john' });
      expect(UserModel.findOne).toHaveBeenCalledTimes(1);
    });
  });
});
