export const TOKEN_STORAGE_KEY = 'auth';

export interface AuthToken {
  access: string;
}

export function storeToken(token: AuthToken) {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
}

export function getStoredToken(): AuthToken | null {
  return JSON.parse(window.localStorage.getItem(TOKEN_STORAGE_KEY) || 'null');
}
