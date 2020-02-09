import { AuthTokenDto } from '@app/dto';
import { InitializerTask } from '~app/core';
import store from '~app/core/store';
import { authActions } from '../store';

export const TOKEN_STORAGE_KEY = 'auth_token';

export function storeToken(token: AuthTokenDto): Promise<void> {
  return Promise.resolve().then(() => {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  });
}

export function loadStoredToken(): Promise<AuthTokenDto | null> {
  return Promise.resolve(JSON.parse(window.localStorage.getItem(TOKEN_STORAGE_KEY) || 'null'));
}

export const tokenInitializer: InitializerTask = (): Promise<AuthTokenDto | null> => {
  return store.dispatch(authActions.loadToken);
};
