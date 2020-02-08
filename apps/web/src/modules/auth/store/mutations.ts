import { createMutationFactory } from '~app/shared/store';
import { AuthToken, storeToken } from '../domain/token';
import { AuthState } from './state';

const createMutation = createMutationFactory<AuthState>();

export const mutations = {
  setToken: createMutation((state, token: AuthToken) => {
    storeToken(token);
    state.token = token;
  }),
};
