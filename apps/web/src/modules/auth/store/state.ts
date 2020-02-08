import { AuthToken } from '../domain/token';

// TODO interface shared with backend
export interface User {
  id: number;
  name: string;
}

export interface AuthState {
  token: AuthToken | null;
  user: User | null;
}

export function initialAuthState(): AuthState {
  return {
    token: null,
    user: null,
  };
}
