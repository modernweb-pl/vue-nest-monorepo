import { AxiosError } from 'axios';
import { RootState } from '~app/core/store';
import { createActionFactory } from '~app/shared/store';
import { authenticate, fetchAuthProfile, refreshToken } from '../service/auth.api';
import { loadStoredToken, storeToken } from '../service/token.storage';
import { authMutations } from './index';
import { AuthState } from './state';

export interface LoginPayload {
  login: string;
  password: string;
}

enum AuthAction {
  LOAD_TOKEN = 'loadToken',
  STORE_TOKEN = 'storeToken',
  REFRESH_TOKEN = 'refreshToken',
  LOGIN = 'login',
  LOGOUT = 'logout',
  FETCH_PROFILE = 'fetchProfile',
}

const createAction = createActionFactory<AuthState, RootState>();

export const actions = {
  [AuthAction.LOAD_TOKEN]: createAction(({ commit }) =>
    loadStoredToken().then((token) => commit(authMutations.setToken, token, { root: true })),
  ),

  [AuthAction.STORE_TOKEN]: createAction(({ commit }, token) => {
    return storeToken(token).then(() => {
      commit(authMutations.setToken, token, { root: true });
    });
  }),

  [AuthAction.REFRESH_TOKEN]: createAction(({ state, dispatch }) => {
    if (!state.token?.refresh) {
      return Promise.reject(new Error('No refresh token'));
    }

    return refreshToken(state.token.refresh)
      .then((token) => dispatch(AuthAction.STORE_TOKEN, token))
      .catch((e: AxiosError) => {
        if (e.response?.status === 401) {
          return dispatch(AuthAction.LOGOUT).then(() => {
            throw e;
          });
        }

        throw e;
      });
  }),

  [AuthAction.LOGIN]: createAction(({ dispatch }, { login, password }: LoginPayload) =>
    authenticate(login, password).then((token) => dispatch(AuthAction.STORE_TOKEN, token)),
  ),

  [AuthAction.LOGOUT]: createAction(({ commit, dispatch }) =>
    dispatch(AuthAction.STORE_TOKEN, void 0).then(() =>
      commit(authMutations.setProfile, void 0, { root: true }),
    ),
  ),

  [AuthAction.FETCH_PROFILE]: createAction(({ commit }) => {
    return fetchAuthProfile().then((res) => commit(authMutations.setProfile, res, { root: true }));
  }),
};
