import Vue from 'vue';
import Vuex from 'vuex';
import type { RootState } from './state';

Vue.use(Vuex);

export default new Vuex.Store<RootState>({
  strict: import.meta.env.MODE !== 'production',
  state: {},
  mutations: {},
  actions: {},
});

export { RootState };
