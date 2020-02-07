import { createMutationFactory, createMutationMap } from '~app/shared/store';
import { AuthToken, storeToken } from '../domain/token';
import { AUTH_NAMESPACE, AuthState } from './state';

const createMutation = createMutationFactory<AuthState>();

export const mutations = {
  setToken: createMutation((state, token: AuthToken) => {
    storeToken(token);
    state.token = token;
  }),
};

export const authMutations = createMutationMap<typeof mutations, AuthState>(
  AUTH_NAMESPACE,
  mutations,
);
