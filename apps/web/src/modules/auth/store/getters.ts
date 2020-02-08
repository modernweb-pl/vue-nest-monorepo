import { RootState } from '~app/core/store';
import { createGetterFactory } from '~app/shared/store';
import { AuthState } from './state';

const createGetter = createGetterFactory<AuthState, RootState>();

export const getters = {
  loggedIn: createGetter((state): boolean => !!state.token),
};
