import { Module } from 'vuex';
import store, { RootState } from '~app/core/store';
import { actions, authActions } from './actions';
import { authGetters, getters } from './getters';
import { authMutations, mutations } from './mutations';
import { AUTH_NAMESPACE, AuthState, initialAuthState } from './state';

export const authStore: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialAuthState(),
  actions,
  mutations,
  getters,
};

store.registerModule(AUTH_NAMESPACE, authStore);

export { authGetters, authMutations, authActions };
