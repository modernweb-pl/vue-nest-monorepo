import { InitializerTask } from '~app/core';
import store from '~app/core/store';
import { authActions } from '../store';

export interface AuthToken {
  access: string;
  refresh: string;
}

export const TOKEN_STORAGE_KEY = 'auth_token';

export function storeToken(token: AuthToken): Promise<void> {
  return Promise.resolve().then(() => {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  });
}

export function loadStoredToken(): Promise<AuthToken | null> {
  return Promise.resolve(JSON.parse(window.localStorage.getItem(TOKEN_STORAGE_KEY) || 'null'));
}

export const tokenInitializer: InitializerTask = (): Promise<AuthToken | null> => {
  return store.dispatch(authActions.loadToken);
};
