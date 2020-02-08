import { RootState } from '~app/core/store';
import { createActionFactory } from '~app/shared/store';
import { AuthToken, loadStoredToken } from '../domain/token';
import { authGetters, authMutations } from './index';
import { AuthState } from './state';

export interface LoginPayload {
  login: string;
  password: string;
}

const createAction = createActionFactory<AuthState, RootState>();

export const actions = {
  loadToken: createAction(({ commit }) => {
    return loadStoredToken().then(token => commit(authMutations.setToken, token, { root: true }));
  }),

  login: createAction(({ commit, getters }, { login, password }: LoginPayload) => {
    if (getters[authGetters.loggedIn]) {
      return;
    }

    // TODO API service
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (login === 'admin@example.com' && password === 'password') {
          const res: AuthToken = { access: 'access_token', refresh: 'refresh_token' };

          commit(authMutations.setToken, res, { root: true });
          resolve(res);
        } else {
          reject();
        }
      }, 500),
    );
  }),

  logout: createAction(({ commit }) => {
    commit(authMutations.setToken, null, { root: true });
  }),
};
