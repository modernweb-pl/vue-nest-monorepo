import { Test, TestingModule } from '@nestjs/testing';
import { configServiceMock } from '../config/__tests__/config.service.mock';
import { usersServiceMockProvider } from '../users/__tests__/users.service.mock';
import { AuthTestingModule } from './__tests__/auth.testing.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthTestingModule],
      controllers: [AuthController],
      providers: [
        AuthService,
        usersServiceMockProvider,
        configServiceMock({
          auth: { secret: 'testsecret', tokenLifetime: '1s', refreshTokenLifetime: '2s' },
        }),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
