import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/store';
import { AUTH_NAMESPACE, AuthState } from './state';

const createGetter = createGetterFactory<AuthState, RootState>();

export const getters = {
  loggedIn: createGetter((state): boolean => !!state.token),
};

export const authGetters = createGetterMap<typeof getters, AuthState, RootState>(
  AUTH_NAMESPACE,
  getters,
);
