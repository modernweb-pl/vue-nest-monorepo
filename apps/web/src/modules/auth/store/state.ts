import { AuthTokenDto } from '@app/dto';

// TODO interface shared with backend
export interface User {
  id: number;
  name: string;
}

export interface AuthState {
  token: AuthTokenDto | null;
  user: User | null;
}

export function initialAuthState(): AuthState {
  return {
    token: null,
    user: null,
  };
}
