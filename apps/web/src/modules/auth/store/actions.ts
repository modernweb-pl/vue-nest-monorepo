import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/store';
import { AuthToken } from '../domain/token';
import { authGetters } from './getters';
import { authMutations } from './mutations';
import { AUTH_NAMESPACE, AuthState } from './state';

export interface LoginPayload {
  login: string;
  password: string;
}

const createAction = createActionFactory<AuthState, RootState>();

export const actions = {
  login: createAction(({ commit, getters }, { login, password }: LoginPayload) => {
    if (getters[authGetters.loggedIn]) {
      return;
    }

    // TODO API service
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (login === 'admin@example.com' && password === 'password') {
          const res: AuthToken = { access: 'access_token' };

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

export const authActions = createActionMap<typeof actions, AuthState, RootState>(
  AUTH_NAMESPACE,
  actions,
);
