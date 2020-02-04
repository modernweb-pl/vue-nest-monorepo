import { Module } from 'vuex';
import store, { RootState } from '~app/core/store';
import { authActions } from './actions';
import { authGetters } from './getters';
import { authMutations } from './mutations';
import { AuthState, initialAuthState } from './state';

export const MODULE_PATH = 'auth';

export const authStore: Module<AuthState, RootState> = {
  state: initialAuthState(),
  actions: authActions,
  mutations: authMutations,
  getters: authGetters,
};

store.registerModule(MODULE_PATH, authStore);
