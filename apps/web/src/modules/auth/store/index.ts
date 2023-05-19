import type { Module } from 'vuex';
import type { RootState } from '~app/core/store';
import { createActionMap, createGetterMap, createMutationMap } from '~app/shared/store';
import { actions } from './actions';
import { getters } from './getters';
import { mutations } from './mutations';
import type { AuthState } from './state';
import { initialAuthState } from './state';

export const authStore: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialAuthState(),
  actions,
  mutations,
  getters,
};

export const AUTH_NAMESPACE = 'auth';

export const authActions = createActionMap<typeof actions, AuthState, RootState>(
  AUTH_NAMESPACE,
  actions,
);

export const authMutations = createMutationMap<typeof mutations, AuthState>(
  AUTH_NAMESPACE,
  mutations,
);

export const authGetters = createGetterMap<typeof getters, AuthState, RootState>(
  AUTH_NAMESPACE,
  getters,
);
