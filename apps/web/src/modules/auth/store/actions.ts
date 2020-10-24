import { RootState } from '~app/core/store';
import { createActionFactory } from '~app/shared/store';
import { authenticate } from '../domain/auth.api';
import { loadStoredToken } from '../domain/token';
import { authGetters, authMutations } from './index';
import { AuthState } from './state';

export interface LoginPayload {
  login: string;
  password: string;
}

const createAction = createActionFactory<AuthState, RootState>();

export const actions = {
  loadToken: createAction(({ commit }) => {
    return loadStoredToken().then((token) => commit(authMutations.setToken, token, { root: true }));
  }),

  login: createAction(({ commit, getters }, { login, password }: LoginPayload) => {
    if (getters[authGetters.loggedIn]) {
      return;
    }

    return authenticate(login, password).then((token) =>
      commit(authMutations.setToken, token, { root: true }),
    );
  }),

  logout: createAction(({ commit }) => {
    commit(authMutations.setToken, null, { root: true });
  }),
};
