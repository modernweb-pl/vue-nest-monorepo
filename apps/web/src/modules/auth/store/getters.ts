import type { RootState } from '~app/core/store';
import { createGetterFactory } from '~app/shared/store';
import type { AuthState } from './state';

const createGetter = createGetterFactory<AuthState, RootState>();

export const getters = {
  token: createGetter((state) => state.token),
  loggedIn: createGetter((state) => !!state.token),
  profile: createGetter((state) => state.profile),
};
