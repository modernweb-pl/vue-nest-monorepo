import type { AuthProfileDto, AuthTokenDto } from '@app/dto';

export interface AuthState {
  token?: AuthTokenDto;
  profile?: AuthProfileDto;
}

export function initialAuthState(): AuthState {
  return {
    token: void 0,
    profile: void 0,
  };
}
