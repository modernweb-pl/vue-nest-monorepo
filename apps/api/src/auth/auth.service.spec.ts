import { Test, TestingModule } from '@nestjs/testing';
import { usersServiceMockProvider } from '../users/__tests__/users.service.mock';
import { AuthTestingModule } from './__tests__/auth.testing.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthTestingModule],
      providers: [AuthService, usersServiceMockProvider],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
