import { Test, TestingModule } from '@nestjs/testing';
import { configServiceMock } from '../config/__tests__/config.service.mock';
import { usersServiceMockProvider } from '../users/__tests__/users.service.mock';
import { AuthTestingModule } from './__tests__/auth.testing.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthTestingModule],
      providers: [
        AuthService,
        usersServiceMockProvider,
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
