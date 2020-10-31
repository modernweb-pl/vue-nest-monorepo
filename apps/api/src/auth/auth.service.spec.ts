import { Test, TestingModule } from '@nestjs/testing';
import { configServiceMock } from '../config/__tests__/config.service.mock';
import { UsersTestingModule } from '../users/__tests__/users.testing.module';
import { AuthTestingModule } from './__tests__/auth.testing.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthTestingModule, UsersTestingModule],
      providers: [
        AuthService,
        configServiceMock({
          auth: { secret: 'testsecret', tokenLifetime: '1s', refreshTokenLifetime: '2s' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
