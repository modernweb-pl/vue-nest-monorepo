// TODO interface shared with backend
export interface User {
  id: number;
  name: string;
}

export interface AuthState {
  user: User | null;
}

export function initialAuthState(): AuthState {
  return {
    user: null,
  };
}
