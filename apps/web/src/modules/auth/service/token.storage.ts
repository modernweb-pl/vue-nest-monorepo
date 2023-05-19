import type { AuthTokenDto } from '@app/dto';

export const TOKEN_STORAGE_KEY = 'auth_token';

export function storeToken(token: AuthTokenDto): Promise<void> {
  return Promise.resolve().then(() => {
    if (!token) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return;
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  });
}

export function loadStoredToken(): Promise<AuthTokenDto> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  return Promise.resolve(token ? JSON.parse(token) : void 0);
}
